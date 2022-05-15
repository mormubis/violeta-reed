import type { BookFragment as RawBook, BooksQuery, BooksQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type Book = {
  cover: string;
  description: string;
  links: string[];
  publishedAt?: string;
  saga?: string;
  slug: string;
  title: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
  published?: boolean;
  saga?: string;
  slug?: string;
};

const fragment = gql`
  fragment Book on Book {
    cover {
      url(transform: { format: WEBP })
    }
    description {
      json
    }
    linksCollection {
      items {
        name
        url
      }
    }
    publishedAt
    saga {
      slug
    }
    slug
    title
  }
`;

const query = gql`
  ${fragment}
  query Books($index: Int, $limit: Int, $preview: Boolean, $publishedAt: DateTime, $saga: String, $slug: String) {
    bookCollection(
      limit: $limit
      preview: $preview
      skip: $index
      where: { publishedAt_lte: $publishedAt, saga: { title: $saga }, slug: $slug }
    ) {
      items {
        ...Book
      }
    }
  }
`;

const mapper = (item: RawBook): Book => ({
  cover: item.cover?.url!,
  description: richTextToHTML(item.description?.json),
  links: item.linksCollection?.items?.map((link) => link?.url!) ?? [],
  publishedAt: item.publishedAt!,
  saga: item.saga?.slug!,
  slug: item.slug!,
  title: item.title!,
});

const publishedDateSort = (a: Book, b: Book): number => {
  return b.publishedAt! < a.publishedAt! ? 1 : -1;
};

async function loader({ index, limit, preview = false, published, saga, slug }: LoaderParams = {}): Promise<Book[]> {
  const { bookCollection } = await graphql<BooksQuery, BooksQueryVariables>(query, {
    index,
    limit,
    preview,
    publishedAt: published && new Date().toISOString(),
    saga,
    slug,
  });

  return (
    bookCollection?.items
      .map((book: RawBook | null) => book!)
      .map(mapper)
      .sort(publishedDateSort) ?? []
  );
}

export type { Book };

export default loader;
