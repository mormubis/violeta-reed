import { clsx as cx } from 'clsx';

import context from './context';

import type React from 'react';

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  index?: number;
  noImage?: boolean;
};

type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'section';

const { Provider } = context;

const Section = <E extends React.ElementType = typeof defaultElement>({
  as,
  className,
  index = 0,
  noImage,
  ...props
}: Props<E>) => {
  const Component = as ?? defaultElement;
  const isReverse = (index ?? 0) % 2 === 1;

  return (
    <Provider value={index}>
      <Component
        {...props}
        className={cx(
          'relative flex max-w-screen-xl flex-col gap-x-16 gap-y-3 px-3 py-5 pt-10',
          'before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-64 before:bg-[color:var(--color)] before:opacity-80',
          'after:absolute after:inset-x-0 after:top-64 after:-z-10 after:h-[calc(100%_-_64_*_var(--spacing))] after:bg-[color:var(--color)] after:opacity-10',
          'md:grid md:grid-cols-[35%_1fr] md:grid-rows-[auto_1fr] md:gap-y-5 md:px-16 md:py-16',
          'md:before:right-3/4 md:before:left-auto md:before:h-full md:before:w-screen',
          'md:after:top-0 md:after:left-1/4 md:after:h-full md:after:w-screen',
          'lg:after:left-1/4',
          isReverse &&
            'md:!grid-cols-[1fr_35%] md:flex-row-reverse md:before:!right-auto md:before:!left-3/4 md:after:!right-1/4 md:after:!left-auto',
          noImage && 'md:!grid-cols-1',
          className,
        )}
      />
    </Provider>
  );
};

export { default as Content } from './Content';
export { default as Image } from './Image';
export { default as Title } from './Title';

export default Section;
