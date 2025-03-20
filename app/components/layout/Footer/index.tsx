import { clsx as cx } from 'clsx';

import Copyright from './Copyright';
import Social from './Social';

import type React from 'react';

type Props = React.ComponentPropsWithRef<'footer'>;

const Footer = ({ className, ...props }: Props) => (
  <footer
    className={cx(
      className,
      'flex w-full flex-col justify-center bg-purple-200 py-4 text-purple-900 md:flex-row md:flex-wrap',
    )}
    {...props}
  />
);

Footer.Copyright = Copyright;
Footer.Social = Social;

export default Footer;
