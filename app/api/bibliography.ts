import type { Book } from '~/api/books';
import bookFetcher from '~/api/books';
import type { Series as RawSeries } from '~/api/series';
import sagaFetcher from '~/api/series';

type Series = Omit<RawSeries, 'books'> & {
  books: Book[];
  publishedAt?: string;
};

type LoaderParams = {
  preview?: boolean;
};

const publishedDateSort = (a: Book | Series, b: Book | Series): number => {
  return b.publishedAt! < a.publishedAt! ? 1 : -1;
};

async function loader({ preview }: LoaderParams = {}): Promise<(Book | Series)[]> {
  const [books, series] = await Promise.all([bookFetcher({ preview }), sagaFetcher({ preview })]);

  const seriesWithBooks: Series[] =
    series.map((item: RawSeries) => {
      const seriesBook: Book[] = item.books.map((slug: string) => books.find((book: Book) => book.slug === slug)!);

      return {
        ...item,
        books: seriesBook,
        publishedAt: seriesBook.reduce(
          (acc, book) => (acc! > book.publishedAt! ? acc : book.publishedAt),
          seriesBook[0]?.publishedAt,
        ),
      };
    }) ?? [];

  const importantBooks = books.filter((book) => {
    const isPublished = !!book.publishedAt;
    const isPublishedLessThanOneYearAgo =
      isPublished && new Date(book.publishedAt!).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 365;
    const isPartOfSeries = series.some((series) => series.books.includes(book.slug));

    return !isPublished || isPublishedLessThanOneYearAgo || !isPartOfSeries;
  });

  return [...seriesWithBooks, ...importantBooks].sort(publishedDateSort);
}

export type { Book, Series };

export default loader;
