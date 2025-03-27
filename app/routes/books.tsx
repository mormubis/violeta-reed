import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';

import assetFetcher from '~/api/assets';
import bookFetcher from '~/api/books';
import Book from '~/components/Book';
import Heading from '~/components/Heading';
import Page from '~/components/Page';

import type { Route } from './+types/books';
import type { Asset } from '~/api/assets';

async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [assets, books] = await Promise.all([
    assetFetcher({ preview }),
    bookFetcher({ preview }),
  ]);

  const logos = assets.reduce(
    (acc, asset) => ({ ...acc, [asset.title]: asset }),
    {} as Record<string, Asset>,
  );

  return { assets: logos, books };
}

const Books = () => {
  const { assets, books } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <Page>
      <Heading className="mb-4 w-full max-w-screen-xl px-4">
        {t('Mis libros')}
      </Heading>
      {books.map((book, index) => (
        <Book {...book} key={book.slug} assets={assets} index={index} />
      ))}
    </Page>
  );
};

export { loader };

export default Books;
