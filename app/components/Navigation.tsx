import React from 'react';

import cx from 'classnames';
import type { LinkProps } from 'remix';
import { Link } from 'remix';

type Props = React.ComponentPropsWithRef<'nav'>;

const Navigation = ({ className, ...props }: Props) => (
  <nav
    {...props}
    className={cx(
      className,
      'absolute bottom-full left-0 w-screen border-b border-stone-800 bg-stone-900 uppercase md:visible md:relative md:top-0 md:flex md:px-12',
    )}
  />
);

Navigation.Link = ({ className, children, ...props }: LinkProps) => (
  <Link
    {...props}
    className={cx(
      className,
      'block flex h-12 items-center justify-center text-xs transition-[background-color] focus:outline-none focus-visible:bg-stone-800 md:h-full md:px-6 md:hover:bg-stone-800',
    )}
  >
    {children}
  </Link>
);

export default Navigation;
