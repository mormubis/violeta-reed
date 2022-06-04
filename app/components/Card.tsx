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
      'relative flex flex-col gap-3 border-b bg-white p-3 md:rounded-sm md:border-r md:p-6',
      !image && 'pt-3 md:pt-6',
    )}
  >
    {/* Image */}
    {image &&
      (isImage(image) ? (
        <img
          alt={image.description}
          className="-mx-3 -mt-3 h-48 max-w-none object-cover saturate-150 md:-mx-6 md:-mt-6 md:h-96"
          src={image.url}
        />
      ) : (
        <figure>{image}</figure>
      ))}

    {/* Title */}
    {title && <header className="flex flex-col">{title}</header>}

    {/* Content */}
    {children}
  </article>
);

export type { Props };

export default Card;
