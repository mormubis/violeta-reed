import React from 'react';
import cx from 'classnames';

import type { Book, Saga } from '~/api/bibliography';

import Card from './Card';
import Cover from './Cover';
import Heading from '~/components/Heading';
import Link from './Link';
import Tag from './Tag';
import HTML from '~/components/HTML';

type OwnProps = {
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Saga & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Saga>;

const SagaPreview = ({
  books,
  className,
  description,
  noTag = false,
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => (
  <Card
    className={cx(
      className,
      'md:pr-12 lg:grid lg:grid-cols-[250px_minmax(0,_1fr)] lg:grid-rows-[auto_minmax(0,_1fr)] lg:gap-x-12',
    )}
  >
    {!noTag && <Tag type="book" />}

    <header className="flex flex-col lg:col-span-2">
      <Heading as={TitleComponent} className="text-stone-900" level={3}>
        {title}
      </Heading>
    </header>

    <HTML className={cx('mb-3 overflow-hidden text-ellipsis text-[15px] leading-5')} content={description ?? ''} />

    <ul className="relative -mb-6 flex gap-3 overflow-x-auto pb-6 md:gap-6">
      {books.map((book: Book) => (
        <li key={book.slug} className="shrink-0">
          <Link className="flex h-full flex-col items-center gap-1 text-center text-sm" to={`/books/${book.slug}`}>
            <Cover title={book.title} url={book.cover} />
            <span className="font-semibold text-stone-900">{book.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </Card>
);

export default SagaPreview;
