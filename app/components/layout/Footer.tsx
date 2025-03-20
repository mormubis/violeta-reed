import { clsx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithRef<'footer'>;

const Footer = ({ className, ...props }: Props) => (
  <footer
    className={clsx(
      className,
      'bg-deep-blush-100 border-deep-blush-200 flex w-full flex-col items-center justify-center gap-y-2 border-t-2 py-4',
    )}
    {...props}
  />
);

export default Footer;
