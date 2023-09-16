import React from 'react';

import cx from 'classnames';

import type { Props } from '~/components/Link';
import LocalLink from '~/components/Link';

const Link = ({ className, children, ...props }: Props) => (
  <LocalLink
    {...props}
    className={cx(
      className,
      'flex h-12 items-center justify-center text-xs uppercase !text-white !transition-[background-color] focus:outline-none focus-visible:bg-purple-100 lg:h-full lg:px-6 lg:!text-stone-900 lg:hover:bg-purple-50 xl:text-sm',
    )}
  >
    {children}
  </LocalLink>
);

export default Link;
