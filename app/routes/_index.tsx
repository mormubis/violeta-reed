import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import type { Asset } from '~/api/assets';
import assetFetcher from '~/api/assets';
import booksFetcher from '~/api/books';
import profileFetcher from '~/api/profile';
import Book from '~/components/Book';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Page, { Section } from '~/components/Page';

import type { LoaderFunctionArgs } from '@remix-run/node';

async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [assets, books, profile] = await Promise.all([
    assetFetcher({ preview }),
    booksFetcher({ preview }),
    profileFetcher({ preview }),
  ]);

  const logos = assets.reduce((acc, asset) => ({ ...acc, [asset.title]: asset }), {} as { [key: string]: Asset });

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
    const presaleDate = presale?.publishedAt ? new Date(presale.publishedAt) : new Date(Number(last?.publishedAt));
    const isNext = bookDate && presaleDate ? bookDate > presaleDate : false;

    return hasPublishDate && isNext;
  });

  return { assets: logos, last, next, presale, profile };
}

const Index = () => {
  const { assets, last, next, presale, profile } = useLoaderData<typeof loader>();

  return (
    <Page className="!gap-y-0 !py-0">
      <Page.Heading className="!absolute opacity-0">Violeta Reed</Page.Heading>
      <section className="-mx-3 overflow-hidden md:-mx-6 xl:overflow-visible">
        {presale && <Book {...presale} assets={assets} index={0} landing />}
        {last && <Book {...last} assets={assets} index={1} landing mini />}
        {next && <Book {...next} assets={assets} index={2} landing mini />}
      </section>
      <Section
        className="-mx-3 overflow-hidden md:-mx-6 xl:overflow-visible"
        style={{ '--color': '#6f1f63' } as React.CSSProperties}
      >
        <figure className="row-span-2 m-auto w-2/3 rounded border border-purple-900 bg-white object-cover p-4">
          <img alt="Violeta Reed" className="object-cover" src={profile.avatar} />
        </figure>
        <Heading className="uppercase text-[color:var(--color)]" level={2}>
          <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
        </Heading>
        <HTML className="lg:!prose-p:text-base text-justify prose-p:text-sm" content={profile.about} />
      </Section>
    </Page>
  );
};

export { loader };

export default Index;
