import { LRUCache as Cache } from 'lru-cache';

import graphql from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

import query from './query.graphql';

import type { PostsQuery, PostsQueryVariables } from '~/.graphql/types';

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
  slug?: string;
};

type Post = {
  abstract?: string;
  content?: string;
  image?: string;
  modifiedAt: string;
  publishedAt: string;
  slug: string;
  title: string;
};

const MONTH = 30 * 24 * 60 * 60 * 1000;

const cache = new Cache<string, Post[], LoaderParams>({
  async fetchMethod(key, stale, { context: { index, limit, preview, slug } }) {
    const { postCollection } = await graphql<PostsQuery, PostsQueryVariables>(query, { index, limit, preview, slug });

    return (
      postCollection?.items
        .map((item) => item!)
        .map((item) => {
          const blocks = item?.content?.json?.content ?? [];

          const paragraph = blocks.find((block: any) => block.nodeType === 'paragraph');
          const abstract = richTextToHTML(paragraph);

          return {
            abstract: abstract,
            content: richTextToHTML(item?.content?.json, item.content?.links),
            image: item.image?.url ?? undefined,
            modifiedAt: item.sys.publishedAt,
            publishedAt: item.sys.firstPublishedAt,
            slug: item.slug!,
            title: item.title!,
          };
        }) ?? []
    );
  },
  max: 25,
  ttl: MONTH,
});

async function loader({ index = 0, limit = 8, preview = false, slug }: LoaderParams = {}): Promise<Post[]> {
  return (await cache.fetch(slug ? slug : `${index}-${limit}`, { context: { index, limit, preview, slug } }))!;
}

export type { Post };

export default loader;
