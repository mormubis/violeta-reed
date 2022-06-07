import React from 'react';

import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book } from '~/api/books';
import booksFetcher from '~/api/books';

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

  const books = await booksFetcher({ preview });

  const [last, presale] = [
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
  ];

  const next = books.find((book) => {
    const hasPublishDate = book.publishedAt !== null;

    const bookDate = book.publishedAt ? new Date(book.publishedAt) : null;
    const presaleDate = presale?.publishedAt ? new Date(presale.publishedAt) : null;
    const isNext = bookDate && presaleDate ? bookDate > presaleDate : false;

    return hasPublishDate && isNext;
  });

  return { last, presale, next };
};

const Index = () => {
  const { last, presale, next } = useLoaderData<Data>();

  return (
    <Page className="!p-0 md:grid-cols-2 md:!gap-0">
      {presale && <Promotion className="h-[80vh] md:h-screen lg:h-[75vh] lg:min-h-[700px]" {...presale} />}
      {next && <Promotion className="h-[80vh] md:h-screen lg:h-[75vh] lg:min-h-[700px]" {...next} />}
      {last && <Promotion className="h-[80vh] md:h-screen lg:h-[75vh] lg:min-h-[700px]" {...last} />}
    </Page>
  );
};

export { loader };

export default Index;
