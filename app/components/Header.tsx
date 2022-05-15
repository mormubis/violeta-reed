import React from 'react';
import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'header'>;

const Header = ({ className, ...props }: Props) => {
  return <header {...props} className={cx(className, '-m-2 mb-2 bg-purple-100 p-2')} />;
};

export default Header;
