import type { MetaQuery, MetaQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';

type LoaderParams = {
  path: string;
};

type Meta = {
  title: string;
  description?: string;
  image?: string;
};

const query = gql`
  query Meta($path: String!) {
    metaCollection(where: { path: $path }) {
      items {
        description
        image {
          url
        }
        title
      }
    }
  }
`;

async function loader({ path }: LoaderParams): Promise<Meta | null> {
  const { metaCollection } = await graphql<MetaQuery, MetaQueryVariables>(query, { path });

  if (!metaCollection) {
    return null;
  }

  const [meta] = metaCollection.items;

  if (!meta) {
    return null;
  }

  return {
    description: meta.description!,
    image: meta.image?.url!,
    title: meta.title!,
  };
}

export type { Meta };

export default loader;
