import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book, Saga } from '~/api/bibliography';
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
import Tag from '~/components/Tag';

const isBook = (item: Saga | Book): item is Book => {
  return (item as Saga).books === undefined;
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
    bibliography: (Book | Saga)[];
    latest: News[];
    profile: Profile;
  }>();

  return (
    <Page className="bg-slate-50">
      <Page.Heading>
        <Tag type="book" />
        <FormattedMessage defaultMessage="Libros" id="BOOKS" />
      </Page.Heading>
      <ul className="flex flex-col gap-5">
        {bibliography.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            {isBook(item) ? (
              <BookPreview {...item} href={`/books/${item.slug}`} noTag />
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
