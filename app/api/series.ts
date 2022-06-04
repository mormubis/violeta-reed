import type { SeriesFragment as RawSeries, SeriesQuery, SeriesQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type Series = {
  books: string[];
  plot?: string;
  title: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
  saga?: string;
  slug?: string;
};

const fragment = gql`
  fragment Series on Series {
    booksCollection {
      items {
        slug
      }
    }
    plot {
      json
    }
    title
  }
`;

const query = gql`
  ${fragment}
  query Series($index: Int, $limit: Int, $preview: Boolean, $saga: String) {
    seriesCollection(limit: $limit, preview: $preview, skip: $index, where: { title: $saga }) {
      items {
        ...Series
      }
    }
  }
`;

const mapper = (item: RawSeries): Series => {
  const books = item.booksCollection?.items.map((book) => book!.slug!) ?? [];
  const plot = richTextToHTML(item.plot?.json);

  return {
    books,
    plot,
    title: item.title!,
  };
};

async function loader({ index, limit, preview, saga }: LoaderParams = {}): Promise<Series[]> {
  const { seriesCollection } = await graphql<SeriesQuery, SeriesQueryVariables>(query, {
    index,
    limit,
    preview,
    saga,
  });

  return seriesCollection?.items.map((saga: RawSeries | null) => saga!).map(mapper) ?? [];
}

export type { Series };

export default loader;
