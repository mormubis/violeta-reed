import type { MetaQuery, MetaQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';

type LoaderParams = {
  path: string;
  preview?: boolean;
};

type Meta = {
  description?: string;
  image?: string;
  keywords: string;
  title: string;
};

const query = gql`
  query Meta($path: String!, $preview: Boolean) {
    metaCollection(preview: $preview, where: { path: $path }) {
      items {
        description
        image {
          url
        }
        keywords
        title
      }
    }
  }
`;

async function loader({ path, preview = false }: LoaderParams): Promise<Meta | null> {
  const { metaCollection } = await graphql<MetaQuery, MetaQueryVariables>(query, { path, preview });

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
    keywords: meta.keywords!,
    title: meta.title!,
  };
}

export type { Meta };

export default loader;
