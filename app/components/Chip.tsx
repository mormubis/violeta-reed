import React from 'react';
import cx from 'classnames';

export type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'span';

const Chip = <E extends React.ElementType = typeof defaultElement>({ as, className, ...props }: Props<E>) => {
  const Component = as ?? defaultElement;

  return (
    <Component
      {...props}
      className={cx(className, 'inline-block rounded-lg bg-purple-400 px-2 py-1 text-xs text-white')}
    />
  );
};

export default Chip;
