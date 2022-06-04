import React from 'react';

import cx from 'classnames';

import Copyright from './Copyright';
import Social from './Social';

type Props = React.ComponentPropsWithRef<'footer'>;

const Footer = ({ className, ...props }: Props) => (
  <footer
    className={cx(
      className,
      'flex w-full flex-col justify-center border-t border-stone-300 bg-white py-4 md:flex-row md:flex-wrap',
    )}
    {...props}
  />
);

Footer.Copyright = Copyright;
Footer.Social = Social;

export default Footer;
