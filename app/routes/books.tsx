import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book, Series } from '~/api/bibliography';
import bibliographyFetcher from '~/api/bibliography';
import type { News } from '~/api/latest';
import latestFetcher from '~/api/latest';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import BookPreview from '~/components/BookPreview';
import LatestNews from '~/components/LatestNews';
import Page from '~/components/Page';
import SagaPreview from '~/components/SagaPreview';

const isBook = (item: Series | Book): item is Book => {
  return (item as Series).books === undefined;
};

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [bibliography, latest, profile] = await Promise.all([
    bibliographyFetcher({ preview }),
    latestFetcher({ preview }),
    profileFetcher({ preview }),
  ]);

  return { bibliography, latest, profile };
};

const Books = () => {
  const { bibliography, latest, profile } = useLoaderData<{
    bibliography: (Book | Series)[];
    latest: News[];
    profile: Profile;
  }>();

  return (
    <Page className="bg-slate-50">
      <Page.Heading>
        <FormattedMessage defaultMessage="Libros" id="BOOKS" />
      </Page.Heading>
      <ul className="flex flex-col gap-5">
        {bibliography.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            {isBook(item) ? (
              <BookPreview {...item} author="Violeta Reed" href={`/books/${item.slug}`} noTag />
            ) : (
              <SagaPreview {...item} noTag />
            )}
          </li>
        ))}
      </ul>
      <Page.Sidebar>
        <AboutMe {...profile} />
        <LatestNews items={latest} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Books;
