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

  const previews = shuffle(books).map((book) => ({
    cover: book.cover.url,
    slug: book.slug,
    title: book.title,
  }));

  return { assets: logos, last, presale, previews, profile };
}

const Index = () => {
  const { assets, last, presale, profile } = useLoaderData<typeof loader>();
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
          <Link to="/libros">
            <ul className="flex gap-2">
              <li>
                <Cover
                  title="Yo también no es te quiero"
                  url="https://images.ctfassets.net/v1kazl7nd6vv/5d0YlmBPgaPWLfTmxU7Vks/273e807c2ace4a3ec1b5f96e9f5b3cbb/DEF_GR65737-Frontal-Yo_tambien_no_es_te_quiero__1_.jpg?w=600&fm=webp"
                />
              </li>
              <li>
                <Cover
                  title="Quizá si quiero"
                  url="https://images.ctfassets.net/v1kazl7nd6vv/4dvqRHOAWtW4Zh6eKTFCb2/75af8fe5f5bed29a613ba96ad1aa4fc8/GR67625-Frontal-Quizas_si_quiero-OK2__2_.jpg?w=600&fm=webp"
                />
              </li>
              <li>
                <Cover
                  title="Cien razones para odiarte"
                  url="https://images.ctfassets.net/v1kazl7nd6vv/6NY8Zx9VfptgGMfWO6uRCb/d2454cf61a1fc44d6be62cf20730a104/BS73037-FRONTAL-Cien_razones_para_odiarte-OK__2_.jpg?w=600&fm=webp"
                />
              </li>
            </ul>
          </Link>
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
