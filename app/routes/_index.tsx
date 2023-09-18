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

  return { assets: logos, last, presale, profile };
}

const Index = () => {
  const { assets, last, presale, profile } = useLoaderData<typeof loader>();

  const cover = presale ?? last;

  return (
    <Page className="!gap-y-0 !p-0">
      <Page.Heading className="!absolute opacity-0">Violeta Reed</Page.Heading>
      {cover && <Book {...cover} assets={assets} index={0} landing />}
      <Section index={1} style={{ '--color': '#f2c073' } as React.CSSProperties}>
        <Heading className="uppercase text-[color:var(--color)]" level={2}>
          <FormattedMessage defaultMessage="Mis libros" id="MY_BOOKS" />
        </Heading>
      </Section>
      <Section index={2} style={{ '--color': '#6c1f62' } as React.CSSProperties}>
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
