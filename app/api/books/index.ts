import { LRUCache as Cache } from 'lru-cache';

import graphql from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

import query from './query.graphql';

import type { BookFragment as RawBook, BooksQuery, BooksQueryVariables } from '~/.graphql/types';

type Book = {
  checkout: Link[];
  color?: string;
  cover: Image;
  promotional?: Image;
  promotionalColor?: string;
  publishedAt?: string;
  series?: string;
  slug: string;
  synopsis: string;
  title: string;
};

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
  published?: boolean;
  saga?: string;
  slug?: string;
};

const MONTH = 30 * 24 * 60 * 60 * 1000;

const cache = new Cache<`${string}-${string}`, Book[], LoaderParams>({
  async fetchMethod(key, stale, { context: { index, limit, preview, published, slug } }) {
    const { bookCollection } = await graphql<BooksQuery, BooksQueryVariables>(query, {
      index,
      limit,
      preview,
      publishedAt: published && new Date().toISOString(),
      slug,
    });

    return bookCollection?.items.map((book: RawBook | null) => book!).map(mapper) ?? [];
  },
  max: 25,
  ttl: MONTH,
});

const mapper = (item: RawBook): Book => {
  const checkout =
    item.checkoutCollection?.items.map((checkout) => ({ name: checkout?.name!, url: checkout?.url! })) ?? [];
  const cover = item.cover!;
  const promotional = item.promotional ?? undefined;

  return {
    checkout,
    color: item.color!,
    cover: { description: cover.description!, url: cover.url! },
    promotional: promotional && { description: promotional.description!, url: promotional.url! },
    promotionalColor: item.promotionalColor!,
    publishedAt: item.publishedAt,
    series: item.series?.title!,
    slug: item.slug!,
    synopsis: richTextToHTML(item.synopsis?.json),
    title: item.title!,
  };
};

async function loader({ index, limit, preview = false, published, slug }: LoaderParams = {}): Promise<Book[]> {
  return (await cache.fetch(`${index}-${limit}{${published}}`, {
    context: { index, limit, preview, published, slug },
    forceRefresh: preview,
  }))!;
}

export type { Book };

export default loader;
