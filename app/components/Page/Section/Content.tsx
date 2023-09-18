import type { ComponentPropsWithoutRef } from 'react';

import cx from 'classnames';

const Content = ({ className, ...props }: ComponentPropsWithoutRef<'section'>) => (
  <section {...props} className={cx(className, 'md:order-3 flex flex-col gap-y-3 md:gap-y-5')} />
);

export default Content;
