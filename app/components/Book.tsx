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

const Book = ({ author, checkout, className, color, cover, publishedAt, slug, synopsis, title, ...props }: Props) => {
  const style = { '--color': color } as React.CSSProperties;

  return (
    <article
      {...props}
      className={cx(
        className,
        'relative grid grid-cols-[35%_1fr] gap-x-16 px-16 py-16 before:absolute before:top-0 before:right-3/4 before:-z-10 before:h-full before:w-screen before:bg-[color:var(--color)]  after:absolute after:top-0 after:left-1/4 after:-z-10 after:h-full after:w-screen after:bg-[color:var(--color)] after:opacity-10',
      )}
      style={style}
    >
      <Cover className="row-span-3" title={cover.description ?? title} url={cover.url} />
      <Heading as="h2" className="uppercase text-[color:var(--color)]" level={2}>
        {title}
      </Heading>
      <HTML content={synopsis} />
    </article>
  );
};

export default Book;
