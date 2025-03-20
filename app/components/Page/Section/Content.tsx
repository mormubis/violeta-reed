import { clsx as cx } from 'clsx';

import type { ComponentPropsWithoutRef } from 'react';

const Content = ({ className, ...props }: ComponentPropsWithoutRef<'section'>) => (
  <section {...props} className={cx(className, 'md:order-3 flex flex-col gap-y-3 md:gap-y-5')} />
);

export default Content;
