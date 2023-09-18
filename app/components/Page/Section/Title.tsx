import type { ComponentPropsWithoutRef } from 'react';
import { useContext } from 'react';

import cx from 'classnames';

import Heading from '~/components/Heading';

import context from './context';

const Title = ({ className, ...props }: ComponentPropsWithoutRef<typeof Heading>) => {
  const index = useContext(context);
  const isEven = (index ?? 0) % 2 === 1;

  return (
    <Heading {...props} className={cx(className, 'uppercase text-[color:var(--color)]', isEven && 'md:order-1')} />
  );
};

export default Title;
