import React from 'react';

import cx from 'classnames';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';
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

Page.Footer = Footer;
Page.Header = Header;
Page.Navigation = Navigation;
Page.Sidebar = Sidebar;

export default Page;
