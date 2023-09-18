import React from 'react';

import cx from 'classnames';

import type { Props as LinkSocialProps } from '~/components/LinkSocial';
import LinkSocial from '~/components/LinkSocial';

type OwnProps = { url: string };
type Props = OwnProps &
  Omit<LinkSocialProps, 'to'> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof OwnProps | keyof LinkSocialProps>;

const Social = ({ className, name, url, ...props }: Props) => (
  <LinkSocial
    {...props}
    className={cx(className, 'space-between flex h-full w-full items-center justify-center text-xs md:w-auto md:px-3')}
    name={name}
    to={url}
  />
);

export default Social;
