import type { SagaFragment as RawSaga, SagasQuery, SagasQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';

export type Saga = {
  description: string;
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
  fragment Saga on Saga {
    description
    slug
    title
  }
`;

const query = gql`
  ${fragment}
  query Sagas($index: Int, $limit: Int, $saga: String, $slug: String) {
    sagaCollection(limit: $limit, skip: $index, where: { slug: $slug, title: $saga }) {
      items {
        ...Saga
      }
    }
  }
`;

const mapper = (item: RawSaga): Saga => ({
  description: item.description!,
  slug: item.slug!,
  title: item.title!,
});

async function loader({ index, limit, saga, slug }: LoaderParams = {}): Promise<Saga[]> {
  const { sagaCollection } = await graphql<SagasQuery, SagasQueryVariables>(query, { index, limit, saga, slug });

  return sagaCollection?.items.map((saga: RawSaga | null) => saga!).map(mapper) ?? [];
}

export default loader;
