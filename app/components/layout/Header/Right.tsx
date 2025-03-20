import { clsx as cx } from 'clsx';

import type React from 'react';

type Props = React.ComponentPropsWithoutRef<'div'>;

const Right = ({ className, ...props }: Props) => (
  <div {...props} className={cx(className, 'absolute right-3 top-0 hidden h-full items-center md:flex')} />
);

export default Right;
