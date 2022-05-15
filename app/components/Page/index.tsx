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
      'grid w-full max-w-7xl grow gap-x-5 gap-y-10 px-3 py-5 pb-10 md:gap-8 md:px-6 xl:grid-cols-[minmax(0,_1fr)_350px]',
    )}
  />
);

Page.Heading = Heading;
Page.Sidebar = Sidebar;

export default Page;
