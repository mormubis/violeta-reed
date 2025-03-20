import { clsx as cx } from 'clsx';
import { useContext } from 'react';

import Heading from '~/components/Heading';

import context from './context';

import type { ComponentPropsWithoutRef } from 'react';

const Title = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Heading>) => {
  const index = useContext(context);
  const isEven = (index ?? 0) % 2 === 1;

  return (
    <Heading
      {...props}
      className={cx(
        className,
        'text-[color:var(--color)] uppercase',
        isEven && 'md:order-1',
      )}
    />
  );
};

export default Title;
