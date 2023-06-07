import React from 'react';

import { useLoaderData } from '@remix-run/react';

import type { Book } from '~/api/books';
import booksFetcher from '~/api/books';
import Page from '~/components/Page';
import Promotion from '~/components/Promotion';

import type { LoaderArgs } from '@remix-run/node';

type Data = {
  last?: Book;
  presale?: Book;
  next?: Book;
};

async function loader({ request }: LoaderArgs): Promise<Data> {
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
      const publishedDate = new Date(book.publishedAt!);
      const isPublished = publishedDate.getTime() < Date.now();
      const hasCheckoutLinks = book.checkout.length > 0;

      return !isPublished && hasCheckoutLinks;
    }),
  ];

  const next = books.find((book) => {
    const hasPublishDate = book.publishedAt !== null;

    const bookDate = book.publishedAt ? new Date(book.publishedAt) : null;
    const presaleDate = presale?.publishedAt ? new Date(presale.publishedAt) : new Date(last?.publishedAt!);
    const isNext = bookDate && presaleDate ? bookDate > presaleDate : false;

    return hasPublishDate && isNext;
  });

  return { last, presale, next };
}

const Index = () => {
  const { last, presale, next } = useLoaderData<Data>();

  return (
    <Page className="!p-0 md:grid-cols-2 md:!gap-0">
      <Page.Heading className="!absolute opacity-0">Violeta Reed</Page.Heading>
      {last && <Promotion className="min-h-[80vh] md:min-h-screen lg:h-[75vh] lg:min-h-[700px]" {...last} />}
      {presale && <Promotion className="min-h-[80vh] md:min-h-screen lg:h-[75vh] lg:min-h-[700px]" {...presale} />}
      {next && <Promotion className="min-h-[80vh] md:min-h-screen lg:h-[75vh] lg:min-h-[700px]" {...next} />}
    </Page>
  );
};

export { loader };

export default Index;
