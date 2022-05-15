import cx from 'classnames';
import React from 'react';

type Props = React.ComponentPropsWithRef<'header'>;

const Header = ({ className, ...props }: Props) => (
  <header
    className={cx(className, 'sticky top-0 z-50 flex h-16 w-full justify-between bg-stone-900 text-white')}
    {...props}
  />
);

export default Header;
