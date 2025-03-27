import { clsx } from 'clsx';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'main'>;

const Page = ({ className, ...props }: Props) => (
  <main
    {...props}
    className={clsx(
      'flex w-full grow flex-col items-center overflow-x-hidden py-4 pb-8',
      'md:px-6 md:py-12',
      className,
    )}
  />
);

export default Page;
