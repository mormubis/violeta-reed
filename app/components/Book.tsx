import React from 'react';

import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Asset } from '~/api/assets';
import type { Book as BookType } from '~/api/books';

import Heading from '~/components/Heading';

import Cover from './Cover';
import HTML from './HTML';

type OwnProps = {
  author?: string;
  assets: { [key: string]: Asset };
  index?: number;
};

type Props = OwnProps & BookType & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof BookType>;

const TODAY = new Date();

const Book = ({
  assets,
  author,
  checkout,
  className,
  color,
  cover,
  index,
  publishedAt,
  promotional,
  promotionalColor,
  series,
  slug,
  synopsis,
  title,
  ...props
}: Props) => {
  const style = { '--color': color } as React.CSSProperties;
  const publishedDate = publishedAt ? new Date(publishedAt) : null;
  const isEven = (index ?? 0) % 2 === 1;

  return (
    <article
      {...props}
      className={cx(
        className,
        'relative flex flex-col gap-y-3 gap-x-16 px-3 py-5 pt-10 before:absolute before:top-0 before:left-0 before:-z-10 before:h-64 before:w-full before:bg-[color:var(--color)] after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:bg-[color:var(--color)] after:opacity-10 md:mx-0 md:grid md:grid-cols-[35%_1fr] md:gap-y-5 md:py-16 md:px-16 md:before:left-auto md:before:right-3/4 md:before:h-full md:before:w-screen md:after:right-0 md:after:w-screen even:md:grid-cols-[1fr_35%] even:md:flex-row-reverse even:md:before:right-auto even:md:before:left-3/4 even:md:after:left-auto even:md:after:right-1/4 lg:after:left-1/4',
      )}
      style={style}
    >
      <Cover
        className={cx('row-span-5 h-64 self-center md:h-auto', isEven && 'md:order-2')}
        title={cover.description ?? title}
        url={cover.url}
      />
      <Heading as="h2" className={cx('uppercase text-[color:var(--color)]', isEven && 'md:order-1')} level={2}>
        {title}
      </Heading>
      {series && (
        <Heading
          as="p"
          className={cx('-mt-5 uppercase text-[color:var(--color)] opacity-80', isEven && 'md:order-3')}
          level={3}
        >
          {series}
        </Heading>
      )}
      <HTML className={cx('lg:!prose-p:text-base prose-p:text-sm', isEven && 'md:order-4')} content={synopsis} />
      {publishedDate && publishedDate > TODAY && (
        <p
          className={cx(
            'border-b-solid place-self-center border-b-2 border-[color:var(--color)] text-center text-xl',
            isEven && 'md:order-5',
          )}
        >
          <FormattedMessage
            defaultMessage="A la venta el <b>{date, date, ::MMMMd}</b>"
            id="SALE_ON"
            values={{
              b: (chunks) => <b className="font-normal uppercase text-[color:var(--color)]">{chunks}</b>,
              date: publishedDate,
            }}
          />
        </p>
      )}
      {checkout.length > 0 && (
        <div
          className={cx(
            '-mx-3 -mb-5 grid grid-cols-3 justify-items-center gap-5 bg-white px-3 py-3 md:grid-cols-7 md:bg-transparent',
            isEven && 'md:order-6',
          )}
        >
          <Heading as="h3" className="col-span-3 md:col-span-7" level={3}>
            <FormattedMessage defaultMessage="Cómpralo en" id="BUY_IN" />
          </Heading>
          {checkout.map((link) => {
            const key = link.name.split('-')[0].replace(/\s/g, '').toLowerCase();

            const asset = assets[key];

            return (
              asset && (
                <a aria-label={link.name} href={link.url} key={link.url} rel="noreferrer" target="_blank">
                  <img alt={asset.title} className="h-16 object-contain" src={asset.url} />
                </a>
              )
            );
          })}
        </div>
      )}
    </article>
  );
};

export default Book;
