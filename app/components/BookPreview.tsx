import React, { useInsertionEffect } from 'react';
import cx from 'classnames';

import type { Book } from '~/api/books';

import Card from './Card';
import HTML from './HTML';
import Link from './Link';
import Tag from './Tag';
import Icon from '~/components/Icon';

type OwnProps = {
  href: string;
  noTag?: boolean;
};

type Props = OwnProps & Book & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Book>;

const BookPreview = ({ className, cover, description, href, noTag = false, title }: Props) => {
  useInsertionEffect(() => {
    if (document.getElementById('__html_book')) {
      return;
    }

    const style = document.createElement('style');
    style.id = '__html_book';
    style.innerHTML = `
      .HTML.book-preview p {
        margin: 0 0 10px 0;
      }
  `;

    document.head.appendChild(style);
  }, []);

  return (
    <Card
      className={cx(
        className,
        'md:grid md:grid-cols-[minmax(0,_1fr)_auto] md:grid-rows-[auto_minmax(0,_1fr)] md:pl-8 md:pr-14 lg:gap-x-12',
      )}
    >
      {!noTag && <Tag type="book" />}

      <header className="flex flex-col md:col-span-2 lg:col-span-2">
        <Link to={href}>
          <h2 className="text-base font-semibold text-stone-900">{title}</h2>
        </Link>
      </header>

      <HTML className="book-preview text-sm" content={description} />

      <Link to={href}>
        <figure className="relative flex h-64 gap-2">
          <img
            alt={title}
            className="block h-full rounded border border-solid border-gray-300 object-cover"
            src={cover}
          />
        </figure>
      </Link>

      <Link
        to={href}
        aria-label={`Más información sobre ${title}`}
        className="absolute bottom-0 right-0 flex  h-12 w-12 items-center justify-center text-purple-400"
      >
        <Icon name="arrow-sm-right" />
      </Link>
    </Card>
  );
};

export default BookPreview;
