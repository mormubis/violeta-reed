import { clsx } from 'clsx';

import type { ComponentProps } from 'react';

type OwnProps = {
  title: string;
  url: string;
};

type Props = OwnProps & Omit<ComponentProps<'img'>, keyof OwnProps>;

const Cover = ({ className, title, url, ...props }: Props) => (
  <img
    {...props}
    alt={title}
    className={clsx(className, 'block aspect-[2/3] rounded object-cover')}
    src={url}
  />
);

export default Cover;
