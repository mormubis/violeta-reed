import React from 'react';

import cx from 'classnames';

import Icon from '~/components/Icon';

type OwnProps = { name: keyof typeof COLORS; to: string };
type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'a'>, keyof OwnProps | 'href'>;

const COLORS = {
  amazon: 'focus-visible:text-[#FF9900] hover:text-[#FF9900]',
  facebook: 'focus-visible:text-[#1877F2] hover:text-[#1877F2]',
  goodreads: 'focus-visible:text-[#372213] hover:text-[#372213]',
  instagram: 'focus-visible:text-[#E4405F] hover:text-[#E4405F]',
  pinterest: 'focus-visible:text-[#BD081C] hover:text-[#BD081C]',
  spotify: 'focus-visible:text-[#1DB954] hover:text-[#1DB954]',
  tiktok: 'focus-visible:text-[#000000] hover:text-[#000000]',
  twitter: 'focus-visible:text-[#1DA1F2] hover:text-[#1DA1F2]',
  wattpad: 'focus-visible:text-[#FF500A] hover:text-[#FF500A]',
};

const LinkSocial = ({ className, name, to, ...props }: Props) => (
  <a
    {...props}
    className={cx(className, 'uppercase transition-[color] focus:outline-none', COLORS[name])}
    href={to}
    rel="noreferrer"
    target="_blank"
  >
    <Icon className="h-4" name={name} />
    {name}
  </a>
);

export type { Props };

export default LinkSocial;
