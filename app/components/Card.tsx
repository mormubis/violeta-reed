import React from 'react';

import cx from 'classnames';

type Image = {
  description: string;
  url: string;
};

type OwnProps = {
  image?: Image | React.ReactNode;
  title?: React.ReactNode;
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps>;

const isImage = (image: any): image is Image => typeof image === 'object' && 'url' in image;

const Card = ({ className, children, image, title, ...props }: Props) => (
  <article
    {...props}
    className={cx(
      className,
      'relative flex flex-col gap-3 overflow-hidden border-b bg-white p-3 md:rounded-sm md:border-r md:p-6',
      image && 'pt-48 md:pt-96',
    )}
  >
    {image &&
      (isImage(image) ? (
        <img
          alt={image.description}
          className="absolute left-0 top-0 h-48 w-full object-cover md:h-96"
          src={image.url}
        />
      ) : (
        <figure>{image}</figure>
      ))}
    {title && <header className={cx('flex flex-col', image && 'mt-3 md:mt-6')}>{title}</header>}
    {children}
  </article>
);

export type { Props };

export default Card;
