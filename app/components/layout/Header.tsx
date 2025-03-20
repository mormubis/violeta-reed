import { clsx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithRef<'header'>;

const Header = ({ className, ...props }: Props) => (
  <header
    className={clsx(
      className,
      'border-alabaster-200 flex h-12 justify-center border-b bg-white drop-shadow-sm lg:h-16',
    )}
    {...props}
  />
);

export default Header;
