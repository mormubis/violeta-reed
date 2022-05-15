import type { Book } from '~/api/books';
import bookFetcher from '~/api/books';
import type { Post } from '~/api/posts';
import postFetcher from '~/api/posts';

type News = Book | Post;

type LoaderParams = {
  limit?: number;
  preview?: boolean;
};

const sorter = (a: Book | Post, b: Book | Post) => {
  return a.publishedAt! > b.publishedAt! ? -1 : 1;
};

async function loader({ limit = 5, preview }: LoaderParams = {}): Promise<News[]> {
  const [books, posts] = await Promise.all([
    bookFetcher({ published: true, limit, preview }),
    postFetcher({ limit, preview }),
  ]);

  return [...books, ...posts].sort(sorter).slice(0, limit);
}

export type { News };

export default loader;
