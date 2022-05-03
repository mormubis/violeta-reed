import React from 'react';
import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'article'>;

const Card = ({ className, ...props }: Props) => (
  <article
    {...props}
    className={cx(
      className,
      'relative -mx-3 flex flex-col gap-2 overflow-hidden border-b bg-white p-5 md:m-0 md:rounded-sm md:border-r',
    )}
  />
);

export default Card;
