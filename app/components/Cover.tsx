import { clsx as cx } from 'clsx';

import type React from 'react';

type OwnProps = {
  title: string;
  url: string;
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'img'>, keyof OwnProps>;

const Cover = ({ className, title, url, ...props }: Props) => (
  <img {...props} alt={title} className={cx(className, 'block aspect-[2/3] rounded object-cover')} src={url} />
);

export default Cover;
