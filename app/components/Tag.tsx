import React from 'react';
import cx from 'classnames';

import Icon from './Icon';

type OwnProps = {
  type: keyof typeof ICON;
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof OwnProps>;

const COLOR = {
  book: 'bg-teal-500',
  post: 'bg-purple-500',
  profile: 'bg-rose-500',
};

const ICON = {
  book: 'bookmark' as const,
  post: 'newspaper' as const,
  profile: 'heart' as const,
};

const Tag = ({ type, className, ...props }: Props) => (
  <div {...props} className={cx(className, 'inline-block rounded-full p-1', COLOR[type])}>
    <Icon className="w-5 text-slate-50" name={ICON[type]} />
  </div>
);

export default Tag;
