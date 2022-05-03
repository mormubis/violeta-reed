import cx from 'classnames';
import React from 'react';
import type { LinkProps as Props } from 'remix';
import { Link as Local } from 'remix';

const Link = ({ className, ...props }: Props) => {
  return (
    <Local
      {...props}
      className={cx(
        className,
        'inline-block text-purple-600 transition-[color] focus:text-purple-500 focus:outline-none',
      )}
    />
  );
};

export default Link;
