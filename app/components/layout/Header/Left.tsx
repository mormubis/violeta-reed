import React from 'react';

import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'aside'>;

const Left = ({ className, ...props }: Props) => (
  <aside {...props} className={cx(className, 'absolute left-0 top-0 h-full items-center md:flex lg:left-3')} />
);

export default Left;
