import React from 'react';

import cx from 'classnames';

import type { Props as GlobalProps } from '~/components/Heading';
import GlobalHeading from '~/components/Heading';

type Props<E extends React.ElementType> = Omit<GlobalProps<E>, 'level'>;

const defaultElement = 'h1';

const Heading = <E extends React.ElementType = typeof defaultElement>({
  as,
  className,
  underline,
  ...props
}: Props<E>) => (
  <GlobalHeading {...props} className={cx(className, 'relative flex items-center gap-2 md:gap-5 xl:col-span-2')} />
);

export default Heading;
