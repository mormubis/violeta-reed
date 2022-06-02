import React from 'react';

import amazon from './amazon';
import arrowCircleDown from './arrow-circle-down';
import arrowSmRight from './arrow-sm-right';
import bookmark from './bookmark';
import facebook from './facebook';
import goodreads from './goodreads';
import heart from './heart';
import instagram from './instagram';
import menu from './menu';
import newspaper from './newspaper';
import pinterest from './pinterest';
import spotify from './spotify';
import tiktok from './tiktok';
import twitter from './twitter';
import wattpad from './wattpad';

type OwnProps = {
  name: keyof typeof ICONS;
};
type Props = OwnProps & Omit<React.ComponentPropsWithRef<'svg'>, keyof OwnProps>;

const ICONS = {
  amazon,
  'arrow-circle-down': arrowCircleDown,
  'arrow-sm-right': arrowSmRight,
  bookmark,
  facebook,
  goodreads,
  heart,
  instagram,
  menu,
  newspaper,
  pinterest,
  spotify,
  tiktok,
  twitter,
  wattpad,
};

const Icon = ({ name, ...props }: Props) => {
  const Component = ICONS[name] ?? ICONS.heart;

  return <Component {...props} />;
};

export default Icon;
