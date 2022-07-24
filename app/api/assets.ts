import type { AssetsQuery, AssetsQueryVariables } from '~/.graphql/types';

import cache from '~/lib/cache';
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
  if (cache.has('assets') && !preview) {
    return cache.get<Asset[]>('assets')!;
  }

  const { assetCollection } = await graphql<AssetsQuery, AssetsQueryVariables>(query, { preview });

  if (!assetCollection) {
    return [];
  }

  const assets = assetCollection.items;

  const data = assets.map((asset) => asset!).map((asset) => ({ title: asset.title!, url: asset.url! }));

  if (!preview) {
    cache.set('assets', data, { ttl: 365 * 24 * 60 * 60 * 1000 }); // Cache for a year
  } else {
    cache.delete('assets');
  }

  return data;
}

export type { Asset };

export default loader;
