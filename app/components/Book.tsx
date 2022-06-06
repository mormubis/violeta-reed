import React from 'react';

import cx from 'classnames';

import type { Book as BookType } from '~/api/books';

import Heading from '~/components/Heading';

import Cover from './Cover';
import HTML from './HTML';

type OwnProps = {
  author?: string;
};

type Props = OwnProps & BookType & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof BookType>;

const Book = ({
  author,
  checkout,
  className,
  color,
  cover,
  publishedAt,
  promotional,
  promotionalColor,
  slug,
  synopsis,
  title,
  ...props
}: Props) => {
  const style = { '--color': color } as React.CSSProperties;

  return (
    <article
      {...props}
      className={cx(
        className,
        'relative flex flex-col gap-y-3 gap-x-16 px-3 py-5 pt-10 before:absolute before:top-0 before:left-0 before:-z-10 before:h-64 before:h-full before:w-full before:bg-[color:var(--color)] after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:bg-[color:var(--color)] after:opacity-10 md:mx-0 md:grid md:grid-cols-[35%_1fr] md:gap-y-0 md:py-16 md:px-16 md:before:left-auto md:before:right-3/4 md:before:h-full md:before:w-screen md:after:right-0 md:after:w-screen lg:after:left-1/4',
      )}
      style={style}
    >
      <Cover className="row-span-3 h-64 self-center md:h-auto" title={cover.description ?? title} url={cover.url} />
      <Heading as="h2" className="uppercase text-[color:var(--color)]" level={2}>
        {title}
      </Heading>
      <HTML content={synopsis} />
      <div>{JSON.stringify(checkout)}</div>
    </article>
  );
};

export default Book;
