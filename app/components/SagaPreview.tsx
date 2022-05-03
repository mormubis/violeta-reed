import React from 'react';
import cx from 'classnames';

import type { Saga } from '~/routes/books';

import Card from './Card';
import Link from './Link';
import Tag from './Tag';

type OwnProps = {
  href: string;
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Saga & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Saga>;

const SagaPreview = ({
  books,
  className,
  description,
  href,
  noTag = false,
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => (
  <Card
    className={cx(
      className,
      'lg:grid lg:grid-cols-[250px_minmax(0,_1fr)] lg:grid-rows-[auto_minmax(0,_1fr)] lg:gap-x-12',
    )}
  >
    {!noTag && <Tag type="book" />}
    <header className="flex flex-col lg:col-span-2">
      <Link to={href}>
        <TitleComponent className="text-base font-semibold text-stone-900">{title}</TitleComponent>
      </Link>
    </header>
    <p className="text-sm">{description}</p>
    <ul className="relative flex gap-3 overflow-y-auto md:gap-6">
      {books.map((book) => (
        <li key={book.slug}>
          <Link className="flex h-full flex-col items-center gap-1 text-center text-sm" to={`/books/${book.slug}`}>
            <img
              alt={book.title}
              className="block h-64 rounded border border-solid border-gray-300 object-cover"
              src={book.cover}
            />
            <span className="font-semibold text-stone-900">{book.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </Card>
);

export default SagaPreview;
