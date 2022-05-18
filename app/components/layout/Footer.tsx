import React from 'react';

import cx from 'classnames';

import Icon from '../Icon';

type CopyrightProps = React.ComponentPropsWithoutRef<'p'>;
type SocialProps = { name: string; url: string } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;
type Props = React.ComponentPropsWithRef<'footer'>;

const Copyright = ({ className, children, ...props }: CopyrightProps) => (
  <p
    {...props}
    className={cx(className, 'mt-4 flex h-12 items-center justify-center border-t border-stone-800 text-xs md:w-full')}
  >
    &copy; {new Date().getFullYear()} {children}
  </p>
);

const Social = ({ className, name, url, ...props }: SocialProps) => (
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
    <Icon className="h-4" name={name.toLocaleLowerCase() as 'facebook'} />
    {name}
  </a>
);

const Footer = ({ className, ...props }: Props) => (
  <footer
    className={cx(
      className,
      'flex w-full flex-col justify-center bg-stone-900 py-4 text-white md:flex-row md:flex-wrap',
    )}
    {...props}
  />
);

Footer.Copyright = Copyright;
Footer.Social = Social;

export default Footer;
