import { clsx as cx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithoutRef<'div'>;

const Left = ({ className, ...props }: Props) => (
  <div {...props} className={cx(className, 'absolute left-0 top-0 h-full items-center md:flex lg:left-3')} />
);

export default Left;
