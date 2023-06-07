import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import type { Asset } from '~/api/assets';
import assetFetcher from '~/api/assets';
import type { Book as BookType } from '~/api/books';
import bookFetcher from '~/api/books';
import Book from '~/components/Book';
import Page from '~/components/Page';

import type { LoaderArgs } from '@remix-run/node';

type Data = { assets: { [key: string]: Asset }; books: BookType[] };

async function loader({ request }: LoaderArgs): Promise<Data> {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [assets, books] = await Promise.all([assetFetcher({ preview }), bookFetcher({ preview })]);

  const logos = assets.reduce((acc, asset) => ({ ...acc, [asset.title]: asset }), {} as { [key: string]: Asset });

  return { assets: logos, books };
}

const Books = () => {
  const { assets, books } = useLoaderData<Data>();

  return (
    <Page className="!pb-0">
      <Page.Heading>
        <FormattedMessage defaultMessage="Libros" id="BOOKS" />
      </Page.Heading>
      <section className="-mx-3 overflow-hidden md:-mx-6 xl:overflow-visible">
        {books.map((book, index) => (
          <Book {...book} assets={assets} author="Violeta Reed" key={book.slug} index={index} />
        ))}
      </section>
    </Page>
  );
};

export { loader };

export default Books;
