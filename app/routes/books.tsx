import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book as BookType } from '~/api/books';
import bookFetcher from '~/api/books';

import Book from '~/components/Book';
import Page from '~/components/Page';

type Data = { books: BookType[] };

const loader: LoaderFunction = async ({ request }): Promise<Data> => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const books = await bookFetcher({ preview });

  return { books };
};

const Books = () => {
  const { books } = useLoaderData<Data>();

  return (
    <Page className="!pb-0">
      <Page.Heading>
        <FormattedMessage defaultMessage="Novelas" id="BOOKS" />
      </Page.Heading>
      <ul className="flex flex-col">
        {books.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            <Book {...item} author="Violeta Reed" />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export { loader };

export default Books;
