import { clsx as cx } from 'clsx';

import Item from './Item';

import type React from 'react';

type Props = React.ComponentPropsWithRef<'nav'>;

const Navigation = ({ className, ...props }: Props) => (
  <nav
    {...props}
    className={cx(
      'bg-alabaster-900 fixed h-screen w-[80vw] flex-col gap-y-4 py-16 text-lg text-white open:flex',
      'md:text-alabaster-950 md:relative md:inline-flex md:h-auto md:w-auto md:flex-row md:gap-x-4 md:bg-transparent md:py-0 md:text-base',
      className,
    )}
  />
);

export { Item };
export default Navigation;
