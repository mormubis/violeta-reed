import { LRUCache as Cache } from 'lru-cache';

import graphql from '~/lib/graphql';

import query from './query.graphql';

import type { MetaQuery, MetaQueryVariables } from '~/.graphql/types';

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

const MIN = 60 * 1000;

const cache = new Cache<`meta:${string}`, Meta, LoaderParams>({
  async fetchMethod(key, stale, { context: { path, preview } }) {
    const { metaCollection } = await graphql<MetaQuery, MetaQueryVariables>(query, { path, preview });

    if (!metaCollection) {
      return undefined;
    }

    const [meta] = metaCollection.items;

    if (!meta) {
      return undefined;
    }

    return {
      description: meta.description!,
      image: meta.image?.url!,
      keywords: meta.keywords!,
      title: meta.title!,
    };
  },
  max: 50,
  ttl: 5 * MIN,
});

async function loader({ path, preview = false }: LoaderParams): Promise<Meta | undefined> {
  return (await cache.fetch(`meta:${path}`, { context: { path, preview }, forceRefresh: preview }))!;
}

export type { Meta };

export default loader;
