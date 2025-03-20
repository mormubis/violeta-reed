import { clsx as cx } from 'clsx';

import LinkSocial from '~/components/LinkSocial';

import type React from 'react';
import type { Props as LinkSocialProps } from '~/components/LinkSocial';

type OwnProps = { url: string };
type Props = OwnProps &
  Omit<LinkSocialProps, 'to'> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof OwnProps | keyof LinkSocialProps>;

const Social = ({ className, name, url, ...props }: Props) => (
  <LinkSocial
    {...props}
    className={cx(
      className,
      'space-between flex h-8 w-full items-center justify-center gap-2 text-xs md:w-auto md:px-3',
    )}
    name={name}
    to={url}
  />
);

export default Social;
