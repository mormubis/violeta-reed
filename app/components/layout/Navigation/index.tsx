import { clsx as cx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithRef<'nav'>;

const Navigation = ({ className, ...props }: Props) => (
  <nav
    {...props}
    className={cx(
      className,
      'flex h-screen w-[80vw] flex-col bg-stone-900 md:w-[50vw] lg:visible lg:inline-flex lg:h-full lg:w-auto lg:flex-row lg:bg-transparent xl:px-12',
    )}
  />
);

export { default as Item } from './Item';
export default Navigation;
