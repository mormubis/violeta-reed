import type { BookFragment as RawBook, BooksQuery, BooksQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type Book = {
  checkout: Link[];
  color?: string;
  cover: Image;
  promotional?: Image;
  promotionalColor?: string;
  publishedAt?: string;
  series?: string;
  slug: string;
  synopsis: string;
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
    checkoutCollection {
      items {
        name
        url
      }
    }
    color
    cover {
      description
      url(transform: { format: WEBP })
    }
    promotional {
      description
      url(transform: { format: WEBP })
    }
    promotionalColor
    publishedAt
    series {
      title
    }
    slug
    synopsis {
      json
    }
    title
  }
`;

const query = gql`
  ${fragment}
  query Books($index: Int, $limit: Int, $preview: Boolean, $publishedAt: DateTime, $slug: String) {
    bookCollection(
      limit: $limit
      preview: $preview
      skip: $index
      order: publishedAt_ASC
      where: { publishedAt_lte: $publishedAt, slug: $slug }
    ) {
      items {
        ...Book
      }
    }
  }
`;

const mapper = (item: RawBook): Book => {
  const checkout =
    item.checkoutCollection?.items.map((checkout) => ({ name: checkout?.name!, url: checkout?.url! })) ?? [];
  const cover = item.cover!;
  const promotional = item.promotional ?? undefined;

  return {
    checkout,
    color: item.color!,
    cover: { description: cover.description!, url: cover.url! },
    promotional: promotional && { description: promotional.description!, url: promotional.url! },
    promotionalColor: item.promotionalColor!,
    publishedAt: item.publishedAt,
    series: item.series?.title!,
    slug: item.slug!,
    synopsis: richTextToHTML(item.synopsis?.json),
    title: item.title!,
  };
};

async function loader({ index, limit, preview = false, published, slug }: LoaderParams = {}): Promise<Book[]> {
  const { bookCollection } = await graphql<BooksQuery, BooksQueryVariables>(query, {
    index,
    limit,
    preview,
    publishedAt: published && new Date().toISOString(),
    slug,
  });

  return bookCollection?.items.map((book: RawBook | null) => book!).map(mapper) ?? [];
}

export type { Book };

export default loader;
