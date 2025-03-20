import { clsx } from 'clsx';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main
    {...props}
    className={clsx(
      'grid w-full max-w-screen-xl grow grid-cols-1 gap-y-5 overflow-x-hidden py-5 pb-10 md:gap-y-10 md:px-6 md:py-10',
      className,
    )}
  />
);

export default Page;
