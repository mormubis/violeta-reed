import { clsx as cx } from 'clsx';

import Heading from './Heading';
import Section from './Section';
import Sidebar from './Sidebar';

import type React from 'react';

type Props = React.ComponentPropsWithoutRef<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main
    {...props}
    className={cx(
      className,
      'grid w-full max-w-screen-xl grow gap-y-5 px-3 py-5 pb-10 md:gap-y-10 md:px-6 md:py-10 grid-cols-1 overflow-x-hidden',
    )}
  />
);

Page.Heading = Heading;
Page.Section = Section;
Page.Sidebar = Sidebar;

export { Heading, Section, Sidebar };
export default Page;
