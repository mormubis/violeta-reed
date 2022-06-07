import React from 'react';

import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Book } from '~/api/books';

import Heading from '~/components/Heading';

type OwnProps = Book;

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps>;

const TODAY = new Date();

const Promotion = ({
  checkout,
  className,
  color: colorProp,
  cover,
  promotional,
  promotionalColor,
  publishedAt,
  series,
  slug,
  synopsis,
  title,
  ...props
}: Props) => {
  const color = promotionalColor ?? colorProp;
  const image = promotional ?? cover;
  const [link] = checkout;
  const publishedDate = publishedAt ? new Date(publishedAt) : null;
  const style = { '--bg-color': color, '--color': colorProp } as React.CSSProperties;

  return (
    <article
      {...props}
      className={cx(
        className,
        'relative flex flex-col items-center justify-center gap-5 text-white before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-1/2 before:w-full before:bg-[color:var(--bg-color)]',
      )}
      style={style}
    >
      {link ? (
        <a className="w-11/12 md:w-3/5" href={link.url} rel="noreferrer" style={style} target="_blank">
          <img alt={image.description} src={image.url} />
        </a>
      ) : (
        <img alt={image.description} className="w-11/12 md:w-3/5" src={image.url} />
      )}

      <header>
        <Heading as="h2" className="text-center uppercase" level={2}>
          {title}
        </Heading>
        <Heading as="p" className="text-center uppercase" level={3}>
          {series}
        </Heading>
      </header>
      {publishedDate && publishedDate > TODAY && (
        <p>
          <FormattedMessage
            defaultMessage="A la venta <b>{date, date, ::MMMMd}</b>"
            id="SALE_ON"
            values={{
              b: (chunks) => <b className="font-normal uppercase text-[color:var(--color)]">{chunks}</b>,
              date: publishedDate,
            }}
          />
        </p>
      )}
      {link ? (
        <a
          className="rounded-sm bg-[color:var(--color)] px-4 py-1 text-sm font-normal uppercase"
          href={link.url}
          rel="noreferrer"
          style={style}
          target="_blank"
        >
          {publishedDate && publishedDate > TODAY ? (
            <FormattedMessage defaultMessage="Comprar en preventa" id="PRESALE" />
          ) : (
            <FormattedMessage defaultMessage="Comprar" id="BUY" />
          )}
        </a>
      ) : (
        <div className="rounded-sm bg-[color:var(--color)] px-4 py-1 text-sm font-normal uppercase" style={style}>
          <FormattedMessage defaultMessage="Próximamente" id="COMING_SOON" />
        </div>
      )}
    </article>
  );
};

export default Promotion;
