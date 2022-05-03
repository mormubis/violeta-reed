import React from 'react';

import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import bookFetcher from '~/api/books';
import type { Book } from '~/api/books';
import sagaFetcher from '~/api/sagas';
import type { Saga as RawSaga } from '~/api/sagas';

import BookPreview from '~/components/BookPreview';
import Heading from '~/components/Heading';
import Page from '~/components/Page';
import Tag from '~/components/Tag';
import SagaPreview from '~/components/SagaPreview';

export type Saga = RawSaga & {
  books: Array<Book>;
  publishedDate?: string;
};

const publishedDateSort = (a: Book | Saga, b: Book | Saga): number => {
  return b.publishedDate! < a.publishedDate! ? 1 : -1;
};

const isBook = (item: Saga | Book): item is Book => {
  return (item as Saga).books === undefined;
};

const loader: LoaderFunction = async () => {
  const [books, rawSagas] = await Promise.all([bookFetcher(), sagaFetcher()]);

  const sagas =
    rawSagas.map((saga: RawSaga) => {
      const sagaBooks = books.filter((book) => book.saga === saga.slug);

      return {
        ...saga,
        books: sagaBooks,
        publishedDate: sagaBooks.reduce(
          (acc, book) => (acc! > book.publishedDate! ? acc : book.publishedDate),
          sagaBooks[0]?.publishedDate,
        ),
      };
    }) ?? [];

  return [...sagas, ...books.filter((book) => !book.saga)].sort(publishedDateSort);
};

const Books = () => {
  const data = useLoaderData<(Book | Saga)[]>();

  return (
    <Page className="bg-slate-50">
      <Heading>
        <Tag type="book" />
        Libros
      </Heading>
      <ul className="flex flex-col gap-5">
        {data.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            {isBook(item) ? (
              <BookPreview {...item} href={`/books/${item.slug}`} noTag />
            ) : (
              <SagaPreview {...item} href={`/books/${item.slug}`} noTag />
            )}
          </li>
        ))}
      </ul>
    </Page>
  );
};

export { loader };

export default Books;
