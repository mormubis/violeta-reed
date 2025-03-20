/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LRUCache as Cache } from 'lru-cache';

import graphql from '~/lib/graphql';

import query from './query.graphql';

import type { AssetsQuery, AssetsQueryVariables } from '~/.graphql/types';

type LoaderParams = {
  preview?: boolean;
};

type Asset = {
  title: string;
  url: string;
};

const YEAR = 365 * 24 * 60 * 60 * 1000;

const cache = new Cache<'all', Asset[], LoaderParams>({
  async fetchMethod(key, stale, { context: { preview } }) {
    const { assetCollection } = await graphql<
      AssetsQuery,
      AssetsQueryVariables
    >(query, { preview });

    if (!assetCollection) {
      return [];
    }

    const assets = assetCollection.items;

    return assets
      .map((asset) => asset!)
      .map((asset) => ({ title: asset.title!, url: asset.url! }));
  },
  max: 100,
  ttl: YEAR,
});

async function loader({ preview = false }: LoaderParams): Promise<Asset[]> {
  return (await cache.fetch('all', {
    context: { preview },
    forceRefresh: preview,
  }))!;
}

export type { Asset };

export default loader;
