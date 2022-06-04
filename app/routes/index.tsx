import React from 'react';

import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book } from '~/api/books';
import booksFetcher from '~/api/books';
// import type { Series } from '~/api/series';
import seriesFetcher from '~/api/series';

import Page from '~/components/Page';
import Promotion from '~/components/Promotion';

type Data = {
  last?: Book;
  presale?: Book;
  next?: Book;
};

const loader: LoaderFunction = async ({ request }): Promise<Data> => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [books] = await Promise.all([booksFetcher({ preview }), seriesFetcher({ preview })]);

  const [last, presale, next] = [
    books.find((book) => {
      const publishedDate = new Date(book.publishedAt!);
      const isPublished = publishedDate.getTime() < Date.now();
      const hasCheckoutLinks = book.checkout.length > 0;

      return isPublished && hasCheckoutLinks;
    }),
    books.find((book) => {
      const hasCheckoutLinks = book.checkout.length > 0;

      return hasCheckoutLinks;
    }),
    books.find((book) => {
      const hasPublishDate = book.publishedAt !== null;

      return hasPublishDate;
    }),
  ];

  return { last, presale, next };
};

const Index = () => {
  const { last, presale, next } = useLoaderData<Data>();

  return (
    <Page className="!p-0 xl:grid-cols-2">
      {presale && <Promotion className="h-screen md:h-1/2" {...presale} />}
      {next && <Promotion className="h-screen md:h-1/2" {...next} />}
      {last && <Promotion className="h-screen md:h-1/2" {...last} />}
    </Page>
  );
};

export { loader };

export default Index;
