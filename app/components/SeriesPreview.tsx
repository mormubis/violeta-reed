import React from 'react';

import cx from 'classnames';

import type { Book, Series } from '~/api/bibliography';

import Heading from '~/components/Heading';
import HTML from '~/components/HTML';

import Card from './Card';
import Cover from './Cover';
import Link from './Link';
import Tag from './Tag';

type OwnProps = {
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Series & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Series>;

const SeriesPreview = ({
  books,
  className,
  noTag = false,
  plot,
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

    {plot && <HTML className={cx('mb-3 overflow-hidden text-ellipsis text-[15px] leading-5')} content={plot} />}

    <ul className="relative -mb-6 flex gap-3 overflow-x-auto pb-6 md:gap-6">
      {books.map((book: Book) => (
        <li key={book.slug} className="shrink-0">
          <Link className="flex h-full flex-col items-center gap-1 text-center" to={`/books/${book.slug}`}>
            <Cover title={book.cover.description ?? book.title} url={book.cover.url} />
            <span className="font-serif font-semibold">{book.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  </Card>
);

export default SeriesPreview;
