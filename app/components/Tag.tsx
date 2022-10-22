import React from 'react';

import cx from 'classnames';
import { useIntl } from 'react-intl';

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

const Tag = ({ type, className, ...props }: Props) => {
  const intl = useIntl();

  let label = intl.formatMessage({ id: 'BOOK', defaultMessage: 'Libro' });

  switch (type) {
    case 'post':
      label = intl.formatMessage({ id: 'POST', defaultMessage: 'Publicación' });
      break;
    case 'profile':
      label = intl.formatMessage({ id: 'PROFILE', defaultMessage: 'Perfil' });
      break;
  }

  return (
    <div {...props} className={cx(className, 'inline-block rounded-full p-1', COLOR[type])} title={label}>
      <Icon className="w-5 text-slate-50" name={ICON[type]} />
    </div>
  );
};

export default Tag;
