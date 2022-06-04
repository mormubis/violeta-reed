import React from 'react';

import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'aside'>;

const Right = ({ className, ...props }: Props) => (
  <aside {...props} className={cx(className, 'absolute right-3 top-0 hidden h-full items-center md:flex')} />
);

export default Right;
