import { useContext } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import cx from 'classnames';

import context from './context';

const Image = ({ className, ...props }: ComponentPropsWithoutRef<'figure'>) => {
  const index = useContext(context);
  const isEven = (index ?? 0) % 2 === 1;

  return <figure {...props} className={cx(className, 'row-span-2 flex self-center', isEven && 'md:order-2')} />;
};

export default Image;
