import React from 'react';

import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'p'>;

const Copyright = ({ className, children, ...props }: Props) => (
  <p
    {...props}
    className={cx(className, 'mt-4 flex h-12 items-center justify-center font-serif text-xs md:w-full md:text-sm')}
  >
    &copy; {new Date().getFullYear()} {children}
  </p>
);

export default Copyright;
