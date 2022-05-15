import cx from 'classnames';
import React from 'react';
import type { LinkProps as Props } from 'remix';
import { Link as Local } from 'remix';

import { usePreview } from './Preview';

const Link = ({ className, to, ...props }: Props) => {
  const preview = usePreview();

  const href = preview
    ? typeof to === 'object'
      ? { ...to, search: `preview=${preview}` }
      : `${to}?preview=${preview}`
    : to;

  return (
    <Local
      {...props}
      className={cx(
        className,
        'inline-block text-purple-600 transition-[color] focus:text-purple-500 focus:outline-none',
      )}
      to={href}
    />
  );
};

export default Link;
