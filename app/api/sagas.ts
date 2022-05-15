import type { SagaFragment as RawSaga, SagasQuery, SagasQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type Saga = {
  description: string;
  slug: string;
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
  fragment Saga on Saga {
    description {
      json
    }
    slug
    title
  }
`;

const query = gql`
  ${fragment}
  query Sagas($index: Int, $limit: Int, $preview: Boolean, $saga: String, $slug: String) {
    sagaCollection(limit: $limit, preview: $preview, skip: $index, where: { slug: $slug, title: $saga }) {
      items {
        ...Saga
      }
    }
  }
`;

const mapper = (item: RawSaga): Saga => ({
  description: richTextToHTML(item.description?.json),
  slug: item.slug!,
  title: item.title!,
});

async function loader({ index, limit, preview, saga, slug }: LoaderParams = {}): Promise<Saga[]> {
  const { sagaCollection } = await graphql<SagasQuery, SagasQueryVariables>(query, {
    index,
    limit,
    preview,
    saga,
    slug,
  });

  return sagaCollection?.items.map((saga: RawSaga | null) => saga!).map(mapper) ?? [];
}

export type { Saga };

export default loader;
