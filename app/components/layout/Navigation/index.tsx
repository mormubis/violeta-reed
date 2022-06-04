import React from 'react';

import cx from 'classnames';

import Link from './Link';

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

Navigation.Link = Link;

export default Navigation;
