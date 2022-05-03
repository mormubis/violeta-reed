import React from 'react';

import cx from 'classnames';

import Icon from './Icon';

type CopyrightProps = React.ComponentPropsWithoutRef<'p'>;
type SocialProps = { name: string; url: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;
type Props = React.ComponentPropsWithRef<'footer'>;

const URL = {
  facebook(username: string) {
    return `https://www.facebook.com/${username}`;
  },
  instagram(username: string) {
    return `https://www.instagram.com/author/show/${username}`;
  },
  goodreads(username: string) {
    return `https://www.goodreads.com/author/show/${username}`;
  },
  pinterest(username: string) {
    return `https://www.pinterest.com/${username}`;
  },
  twitter(username: string) {
    return `https://www.twitter.com/${username}`;
  },
};

const Footer = ({ className, ...props }: Props) => (
  <footer
    className={cx(
      className,
      'flex w-full flex-col justify-center bg-stone-900 py-4 text-white md:flex-row md:flex-wrap',
    )}
    {...props}
  />
);

Footer.Copyright = ({ className, children, ...props }: CopyrightProps) => (
  <p
    {...props}
    className={cx(className, 'mt-4 flex h-12 items-center justify-center border-t border-stone-800 text-xs md:w-full')}
  >
    &copy; {new Date().getFullYear()} {children}
  </p>
);

Footer.Social = ({ className, name, url, ...props }: SocialProps) => (
  <a
    {...props}
    className={cx(
      className,
      'space-between flex h-8 w-full items-center justify-center gap-2 text-xs uppercase transition-[background-color] hover:bg-stone-800 focus:outline-none focus-visible:bg-stone-800 md:w-auto md:px-3',
    )}
    href={url}
    rel="noreferrer"
    target="_blank"
  >
    <Icon className="h-4" name={name as 'facebook'} />
    {name}
  </a>
);

export default Footer;
