import React from 'react';

import { Link as Local } from '@remix-run/react';
import cx from 'classnames';

import { usePreview } from './Preview';

import type { LinkProps } from '@remix-run/react';

type OwnProps = { to: string };
type Props = OwnProps & Omit<LinkProps, keyof OwnProps>;

const Link = ({ className, to, ...props }: Props) => {
  const preview = usePreview();
  const url = new URL(to, typeof window === 'undefined' ? 'http://localhost' : window.location.href);
  url.searchParams.set('preview', 'true');

  const href = preview ? url.toString() : to;

  return (
    <Local
      {...props}
      className={cx(
        className,
        'inline-block text-purple-800 transition-colors focus:text-purple-500 focus:outline-none visited:text-purple-500',
      )}
      to={href}
    />
  );
};

export type { Props };

export default Link;
