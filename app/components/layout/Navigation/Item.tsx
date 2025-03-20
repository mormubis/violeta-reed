import { clsx } from 'clsx';

import LocalLink from '~/components/Link';

import type { LinkProps as Props } from '~/components/Link';

const Item = ({ className, children, ...props }: Props) => (
  <LocalLink
    {...props}
    className={clsx(
      className,
      'text-md flex items-center justify-center px-2 uppercase',
    )}
  >
    {children}
  </LocalLink>
);

export default Item;
