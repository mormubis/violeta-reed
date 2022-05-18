import React from 'react';

import cx from 'classnames';

import Icon from '~/components/Icon';

type RightProps = React.ComponentPropsWithoutRef<'aside'>;
type SocialProps = { name: string; url: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;
type Props = React.ComponentPropsWithRef<'header'>;

const Header = ({ className, ...props }: Props) => (
  <header
    className={cx(className, 'sticky top-0 z-50 flex h-16 w-full justify-between bg-stone-900 text-white')}
    {...props}
  />
);

const Right = ({ className, ...props }: RightProps) => (
  <aside {...props} className={cx(className, 'absolute right-3 top-0 hidden h-full items-center gap-3 md:flex')} />
);

const Social = ({ className, name, url, ...props }: SocialProps) => (
  <a
    {...props}
    aria-label={name}
    className={cx(
      className,
      'inline-block flex h-12 w-12 items-center justify-center transition-[background-color] hover:bg-stone-800 focus:outline-none focus-visible:bg-stone-800',
    )}
    href={url}
    rel="noreferrer"
    title={name}
    target="_blank"
  >
    <Icon className="h-4" name={name.toLocaleLowerCase() as 'facebook'} />
  </a>
);

Header.Right = Right;
Header.Social = Social;

export default Header;
