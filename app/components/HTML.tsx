import React from 'react';

import cx from 'classnames';

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  content: string;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'div';

const HTML = <E extends React.ElementType = typeof defaultElement>({ as, className, content }: Props<E>) => {
  const Component = as ?? defaultElement;

  return (
    <Component
      className={cx(
        className,
        'prose-li:before:color-purple-500 prose prose-purple flex max-w-none flex-col gap-2 prose-headings:m-0 prose-headings:font-serif prose-p:m-0 prose-a:bg-purple-100 prose-a:py-1 prose-a:px-1 prose-blockquote:relative prose-blockquote:pl-6 prose-blockquote:before:absolute prose-blockquote:before:top-0 prose-blockquote:before:left-0 prose-blockquote:before:h-full prose-blockquote:before:w-3 prose-blockquote:before:bg-purple-100 prose-figure:m-0 prose-figure:mx-auto prose-figure:rounded-sm prose-figure:bg-white prose-figure:p-4 prose-figure:drop-shadow-sm prose-figcaption:text-center prose-figcaption:text-sm prose-ol:list-decimal prose-ul:pl-5 prose-li:m-0 prose-li:p-0 prose-img:max-h-96 prose-img:rounded-sm prose-hr:my-3 md:prose-sm md:prose-p:m-0',
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTML;
