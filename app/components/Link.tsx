import { clsx } from 'clsx';
import { Link as Local } from 'react-router';

import type { LinkProps as Props } from 'react-router';

const Link = ({ className, ...props }: Props) => (
  <Local
    {...props}
    className={clsx(
      'font-semibold text-(--text-color) transition-opacity [--default-text-color:text-purple-700] [--text-color:var(--color,--default-text-color))] visited:text-(--text-color) hover:opacity-80 focus:opacity-80 focus:outline-none',
      className,
    )}
  />
);

export type { Props as LinkProps };
export default Link;
