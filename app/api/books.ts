import type { BookFragment as RawBook, BooksQuery, BooksQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type Book = {
  cover: string;
  description: string;
  links: string[];
  publishedDate?: string;
  saga?: string;
  slug: string;
  title: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
  saga?: string;
  slug?: string;
};

const fragment = gql`
  fragment Book on Book {
    cover {
      url
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
    publishedDate
    saga {
      slug
    }
    slug
    title
  }
`;

const query = gql`
  ${fragment}
  query Books($index: Int, $limit: Int, $saga: String, $slug: String) {
    bookCollection(limit: $limit, skip: $index, where: { saga: { title: $saga }, slug: $slug }) {
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
  publishedDate: item.publishedDate!,
  saga: item.saga?.slug!,
  slug: item.slug!,
  title: item.title!,
});

const publishedDateSort = (a: Book, b: Book): number => {
  return b.publishedDate! < a.publishedDate! ? 1 : -1;
};

async function loader({ index, limit, saga, slug }: LoaderParams = {}): Promise<Book[]> {
  const { bookCollection } = await graphql<BooksQuery, BooksQueryVariables>(query, { index, limit, saga, slug });

  return (
    bookCollection?.items
      .map((book: RawBook | null) => book!)
      .map(mapper)
      .sort(publishedDateSort) ?? []
  );
}

export type { Book };

export default loader;
