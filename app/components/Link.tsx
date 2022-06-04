import React from 'react';

import cx from 'classnames';
import type { LinkProps } from 'remix';
import { Link as Local } from 'remix';

import { usePreview } from './Preview';

type OwnProps = { to: string };
type Props = OwnProps & Omit<LinkProps, keyof OwnProps>;

const Link = ({ className, to, ...props }: Props) => {
  const preview = usePreview();

  const href = preview ? `${to}?preview=${preview}` : to;

  return (
    <Local
      {...props}
      className={cx(
        className,
        'inline-block text-purple-800 transition-[color] focus:text-purple-700 focus:outline-none',
      )}
      to={href}
    />
  );
};

export type { Props };

export default Link;
