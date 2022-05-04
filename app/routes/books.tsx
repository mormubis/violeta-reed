import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book, Saga } from '~/api/bibliography';
import fetcher from '~/api/bibliography';

import BookPreview from '~/components/BookPreview';
import Heading from '~/components/Heading';
import Page from '~/components/Page';
import Tag from '~/components/Tag';
import SagaPreview from '~/components/SagaPreview';

const isBook = (item: Saga | Book): item is Book => {
  return (item as Saga).books === undefined;
};

const loader: LoaderFunction = () => {
  return fetcher();
};

const Books = () => {
  const data = useLoaderData<(Book | Saga)[]>();

  return (
    <Page className="bg-slate-50">
      <Heading>
        <Tag type="book" />
        <FormattedMessage defaultMessage="Libros" id="BOOKS" />
      </Heading>
      <ul className="flex flex-col gap-5">
        {data.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            {isBook(item) ? (
              <BookPreview {...item} href={`/books/${item.slug}`} noTag />
            ) : (
              <SagaPreview {...item} href={`/books/${item.slug}`} noTag />
            )}
          </li>
        ))}
      </ul>
    </Page>
  );
};

export { loader };

export default Books;
