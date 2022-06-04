import React from 'react';

import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Book } from '~/api/books';

import Heading from '~/components/Heading';

type OwnProps = Book;

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps>;

const Promotion = ({
  checkout,
  className,
  color,
  cover,
  promotional,
  publishedAt,
  slug,
  synopsis,
  title,
  ...props
}: Props) => {
  const image = promotional ?? cover;
  const [link] = checkout;

  return (
    <article
      {...props}
      className={cx(className, 'relative flex flex-col items-center justify-center gap-5')}
      style={{ backgroundColor: color }}
    >
      <img alt={image.description} className="h-3/5 rounded border border-stone-800" src={image.url} />
      <header>
        <Heading className="text-center !text-4xl">{title}</Heading>
      </header>
      {link && (
        <a className="rounded-sm border border-stone-900 bg-purple-900 px-3 py-2 text-sm text-white" href={link.url}>
          <FormattedMessage defaultMessage="Comprar" id="BUY" />
        </a>
      )}
    </article>
  );
};

export default Promotion;
