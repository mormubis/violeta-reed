import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';

import assetFetcher from '~/api/assets';
import booksFetcher from '~/api/books';
import profileFetcher from '~/api/profile';
import Book from '~/components/Book';
import Cover from '~/components/Cover';
import HTML from '~/components/HTML';
import Link from '~/components/Link';
import Page from '~/components/Page';
import Section, { Content, Image, Title } from '~/components/Page/Section';

import type { Route } from './+types/home';
import type { Asset } from '~/api/assets';

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [assets, books, profile] = await Promise.all([
    assetFetcher({ preview }),
    booksFetcher({ preview }),
    profileFetcher({ preview }),
  ]);

  const logos = assets.reduce(
    (acc, asset) => ({ ...acc, [asset.title]: asset }),
    {} as Record<string, Asset>,
  );

  const [last, presale] = [
    books
      .filter((book) => book.publishedAt)
      .sort((a, b) => {
        // The previous filter guarantees that publishedAt is not null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dateA = new Date(a.publishedAt!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dateB = new Date(b.publishedAt!);

        return dateB.getTime() - dateA.getTime();
      })
      .find((book) => {
        // Same here
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const publishedDate = new Date(book.publishedAt!);
        const isPublished = publishedDate.getTime() < Date.now();
        const hasCheckoutLinks = book.checkout.length > 0;

        return isPublished && hasCheckoutLinks;
      }),
    books
      .filter((book) => book.publishedAt)
      .sort((a, b) => {
        // The previous filter guarantees that publishedAt is not null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dateA = new Date(a.publishedAt!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const dateB = new Date(b.publishedAt!);

        return dateB.getTime() - dateA.getTime();
      })
      .find((book) => {
        // Same here
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const publishedDate = new Date(book.publishedAt!);
        const isPublished = publishedDate.getTime() < Date.now();
        const hasCheckoutLinks = book.checkout.length > 0;

        return !isPublished && hasCheckoutLinks;
      }),
  ];

  const previews = shuffle(books)
    .slice(0, 3)
    .map((book) => ({
      cover: book.cover.url,
      slug: book.slug,
      title: book.title,
    }));

  return { assets: logos, last, presale, previews, profile };
}

const Index = () => {
  const { assets, last, presale, previews, profile } =
    useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const cover = presale ?? last;

  return (
    <Page className="!pt-0">
      {cover && <Book {...cover} landing assets={assets} index={0} />}
      <Section className="[--color:#f2c073]" index={1}>
        <Title
          className="text-white uppercase max-sm:order-1 md:text-[color:var(--color)]"
          level={2}
        >
          {t('Mis libros')}
        </Title>
        <Content className="max-sm:order-3">
          {t('¿Quieres conocer mis otras novelas?')}
          <ul className="flex gap-2">
            {previews.map((book) => (
              <li>
                <Link key={book.slug} to={`/libros/#${book.slug}`}>
                  <Cover title={book.title} url={book.cover} />
                </Link>
              </li>
            ))}
          </ul>
        </Content>
        <Image className="max-sm:order-1" />
      </Section>
      <Section className="[--color:var(--color-finn-900)]" index={2}>
        <Image>
          <img
            alt={profile.name}
            className="w-2/3 rounded-xs border border-[hsl(from_var(--color)_h_calc(s_/_1.25)_l)] bg-white object-cover p-4 pb-8 md:border-2"
            src={profile.avatar}
          />
        </Image>
        <HTML className="text-justify" content={profile.about} />
      </Section>
    </Page>
  );
};

export { loader };

export default Index;
