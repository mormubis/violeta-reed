import { LRUCache as Cache } from 'lru-cache';

import graphql from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

import query from './query.graphql';

import type { BooksQuery, BooksQueryVariables, BookFragment as RawBook } from '~/.graphql/types';

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
  tagline: string;
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

    const books = bookCollection?.items.map((book: RawBook | null) => book!).map(mapper) ?? [];

    books.sort((a, b) => {
      const publishedA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const publishedB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

      return a.series === b.series ? publishedA - publishedB : publishedB - publishedA;
    });

    return books;
  },
  max: 25,
  ttl: MONTH,
});

const mapper = (item: RawBook): Book => {
  const checkout =
    item.checkoutCollection?.items.map((checkout) => ({ name: String(checkout?.name), url: String(checkout?.url) })) ??
    [];
  const cover = item.cover!;
  const promotional = item.promotional ?? undefined;

  return {
    checkout,
    color: item.color!,
    cover: { description: cover ? cover.description! : '', url: cover ? cover.url! : '' },
    promotional: promotional && {
      description: promotional ? promotional.description! : '',
      url: promotional ? promotional.url! : '',
    },
    promotionalColor: item.promotionalColor!,
    publishedAt: item.publishedAt,
    series: item.series ? String(item.series?.title) : undefined,
    slug: item.slug!,
    synopsis: richTextToHTML(item.synopsis?.json),
    tagline: item.tagline!,
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
