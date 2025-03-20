import { clsx as cx } from 'clsx';
import { useContext } from 'react';

import context from './context';

import type { ComponentPropsWithoutRef } from 'react';

const Image = ({ className, ...props }: ComponentPropsWithoutRef<'figure'>) => {
  const index = useContext(context);
  const isEven = (index ?? 0) % 2 === 1;

  return (
    <figure
      {...props}
      className={cx(
        className,
        'row-span-2 flex justify-center self-center',
        isEven && 'md:order-2',
      )}
    />
  );
};

export default Image;
