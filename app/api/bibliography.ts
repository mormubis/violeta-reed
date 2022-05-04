import type { Book } from '~/api/books';
import bookFetcher from '~/api/books';
import type { Saga as RawSaga } from '~/api/sagas';
import sagaFetcher from '~/api/sagas';

type Saga = RawSaga & {
  books: Book[];
  publishedDate?: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
};

const publishedDateSort = (a: Book | Saga, b: Book | Saga): number => {
  return b.publishedDate! < a.publishedDate! ? 1 : -1;
};

async function loader({ index, limit }: LoaderParams = {}): Promise<(Book | Saga)[]> {
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
}

export type { Book, Saga };

export default loader;
