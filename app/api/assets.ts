import type { AssetsQuery, AssetsQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';

type LoaderParams = {
  preview?: boolean;
};

type Asset = {
  title: string;
  url: string;
};

const query = gql`
  query Assets($preview: Boolean) {
    assetCollection(
      preview: $preview
      where: { title_in: ["amazon", "apple", "casadellibro", "elcorteingles", "fnac", "google", "penguin"] }
    ) {
      items {
        title
        url(transform: { format: WEBP })
      }
    }
  }
`;

async function loader({ preview = false }: LoaderParams): Promise<Asset[]> {
  const { assetCollection } = await graphql<AssetsQuery, AssetsQueryVariables>(query, { preview });

  if (!assetCollection) {
    return [];
  }

  const assets = assetCollection.items;

  return assets.map((asset) => asset!).map((asset) => ({ title: asset.title!, url: asset.url! }));
}

export type { Asset };

export default loader;
