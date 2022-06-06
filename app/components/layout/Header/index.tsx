import React from 'react';

import cx from 'classnames';

// import useEventListener from '~/use/eventListener';
import Left from './Left';
import Right from './Right';
import Social from './Social';

type Props = React.ComponentPropsWithRef<'header'>;

const Header = ({ className, ...props }: Props) => {
  // useEventListener('scroll', (event) => {
  //   console.log(event.target.documentElement.scrollTop);
  // });

  return (
    <header
      className={cx(className, 'flex h-16 justify-center border-b border-stone-300 bg-white md:border-0 lg:h-32')}
      {...props}
    />
  );
};

Header.Left = Left;
Header.Right = Right;
Header.Social = Social;

export default Header;
