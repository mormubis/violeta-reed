import React from 'react';
import cx from 'classnames';

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  underline?: boolean;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'h1';

const Heading = <E extends React.ElementType = typeof defaultElement>({
  as,
  className,
  level = 1,
  underline,
  ...props
}: Props<E>) => {
  const Component = as ?? defaultElement;

  return (
    <Component
      {...props}
      className={cx(
        className,
        'relative flex items-center gap-2 font-serif md:col-span-2',
        level === 1 && 'text-2xl font-bold md:text-4xl lg:text-5xl',
        level === 2 && 'text-xl font-bold md:text-2xl lg:text-3xl',
        level === 3 && 'text-lg font-semibold lg:text-xl',
      )}
    />
  );
};

export default Heading;
