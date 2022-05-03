import React from 'react';

import cx from 'classnames';

type Props = React.ComponentPropsWithoutRef<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main {...props} className={cx(className, 'flex w-full max-w-7xl grow flex-col gap-5 px-3 py-5 pb-10 md:px-6')} />
);

export default Page;
