import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book, Series } from '~/api/bibliography';
import bibliographyFetcher from '~/api/bibliography';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import BookPreview from '~/components/BookPreview';
import Page from '~/components/Page';
import SeriesPreview from '~/components/SeriesPreview';

const isBook = (item: Series | Book): item is Book => {
  return (item as Series).books === undefined;
};

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [bibliography, profile] = await Promise.all([bibliographyFetcher({ preview }), profileFetcher({ preview })]);

  return { bibliography, profile };
};

const Books = () => {
  const { bibliography, profile } = useLoaderData<{
    bibliography: (Book | Series)[];
    profile: Profile;
  }>();

  return (
    <Page className="bg-slate-50">
      <Page.Heading>
        <FormattedMessage defaultMessage="Novelas" id="BOOKS" />
      </Page.Heading>
      <ul className="flex flex-col gap-5">
        {bibliography.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            {isBook(item) ? (
              <BookPreview {...item} author="Violeta Reed" href={`/books/${item.slug}`} />
            ) : (
              <SeriesPreview {...item} noTag />
            )}
          </li>
        ))}
      </ul>
      <Page.Sidebar>
        <AboutMe {...profile} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Books;
