import React from 'react';

import cx from 'classnames';

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'h1';

const Heading = <E extends React.ElementType = typeof defaultElement>({
  as,
  className,
  level = 1,
  ...props
}: Props<E>) => {
  const Component = as ?? defaultElement;

  return (
    <Component
      {...props}
      className={cx(
        'font-serif',
        level === 1 && 'text-2xl font-normal uppercase tracking-wider md:text-3xl lg:text-4xl',
        level === 2 && 'text-xl font-normal tracking-widest md:text-xl lg:text-2xl',
        level === 3 && 'text-lg font-normal tracking-wider lg:text-xl',
        level === 4 && 'uppercase',
        className,
      )}
    />
  );
};

export type { Props };

export default Heading;
