import React from 'react';

import cx from 'classnames';

import type { Book } from '~/api/books';

import Heading from '~/components/Heading';

import Cover from './Cover';
import HTML from './HTML';

type OwnProps = {
  author?: string;
};

type Props = OwnProps & Book & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Book>;

const BookPreview = ({
  author,
  checkout,
  className,
  color,
  cover,
  publishedAt,
  slug,
  synopsis,
  title,
  ...props
}: Props) => (
  <article
    {...props}
    className={cx(
      className,
      'relative grid grid-cols-[333px_1fr] gap-x-10 py-16 before:absolute before:top-0 before:right-3/4 before:-z-10 before:h-full before:w-screen before:bg-violet-200',
    )}
  >
    <Cover className="row-span-3 row-start-1" title={cover.description ?? title} url={cover.url} />
    <Heading>{title}</Heading>
    <HTML content={synopsis} />
  </article>
);

export default BookPreview;
