import React from 'react';

import cx from 'classnames';

import Heading from './Heading';
import Section from './Section';
import Sidebar from './Sidebar';

type Props = React.ComponentPropsWithoutRef<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main
    {...props}
    className={cx(
      className,
      'grid w-full max-w-screen-xl grow gap-y-5 px-3 py-5 pb-10 md:gap-y-10 md:px-6 md:py-10 grid-cols-1',
    )}
  />
);

Page.Heading = Heading;
Page.Section = Section;
Page.Sidebar = Sidebar;

export { Heading, Section, Sidebar };
export default Page;
