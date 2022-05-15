import type { Book } from '~/api/books';
import bookFetcher from '~/api/books';
import type { Saga as RawSaga } from '~/api/sagas';
import sagaFetcher from '~/api/sagas';

type Saga = RawSaga & {
  books: Book[];
  publishedAt?: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
};

const publishedDateSort = (a: Book | Saga, b: Book | Saga): number => {
  return b.publishedAt! < a.publishedAt! ? 1 : -1;
};

async function loader({ index, limit, preview }: LoaderParams = {}): Promise<(Book | Saga)[]> {
  const [books, rawSagas] = await Promise.all([bookFetcher({ preview }), sagaFetcher({ preview })]);

  const sagas =
    rawSagas.map((saga: RawSaga) => {
      const sagaBooks = books.filter((book) => book.saga === saga.slug);

      return {
        ...saga,
        books: sagaBooks,
        publishedAt: sagaBooks.reduce(
          (acc, book) => (acc! > book.publishedAt! ? acc : book.publishedAt),
          sagaBooks[0]?.publishedAt,
        ),
      };
    }) ?? [];

  return [...sagas, ...books.filter((book) => !book.saga)].sort(publishedDateSort);
}

export type { Book, Saga };

export default loader;
