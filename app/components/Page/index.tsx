import React from 'react';

import cx from 'classnames';

import Heading from './Heading';
import Sidebar from './Sidebar';

type Props = React.ComponentPropsWithoutRef<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main
    {...props}
    className={cx(
      className,
      'grid w-full max-w-7xl grow gap-x-3 gap-y-5 px-3 py-5 pb-10 md:gap-x-6 md:gap-y-10 md:px-6 md:py-10 xl:grid-cols-[minmax(0,_1fr)_350px]',
    )}
  />
);

Page.Heading = Heading;
Page.Sidebar = Sidebar;

export default Page;
