import React from 'react';

import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Asset } from '~/api/assets';
import type { Book as BookType } from '~/api/books';
import Heading from '~/components/Heading';
import Section, { Content, Image, Title } from '~/components/Page/Section';

import Cover from './Cover';
import HTML from './HTML';

type OwnProps = {
  assets: { [key: string]: Asset };
  index?: number;
  landing?: boolean;
};

type Props = OwnProps & BookType & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof BookType>;

const TODAY = new Date();

const Book = ({
  assets,
  checkout,
  color,
  cover,
  index,
  landing,
  publishedAt,
  promotional,
  promotionalColor,
  series,
  slug,
  synopsis,
  tagline,
  title,
  ...props
}: Props) => {
  const style = { '--color': color } as React.CSSProperties;
  const publishedDate = publishedAt ? new Date(publishedAt) : null;

  return (
    <Section {...props} as="article" index={index} style={style}>
      <div id={slug} className="absolute -top-16 z-10 lg:-top-32" />
      <Image>
        <Cover className="h-64 md:h-auto" title={cover.description ?? title} url={cover.url} />
      </Image>
      <Title as="h2" level={2}>
        {title}
      </Title>
      <Content className="">
        {series && (
          <Heading as="p" className={cx('uppercase text-[color:var(--color)] opacity-80 -mt-5')} level={3}>
            {series}
          </Heading>
        )}
        <HTML className={cx('lg:!prose-p:text-base prose-p:text-sm max-w-none')} content={synopsis} />
        {publishedDate && publishedDate > TODAY && (
          <p
            className={cx(
              'border-b-solid place-self-center border-b-2 border-[color:var(--color)] text-center text-xl',
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
            )}
          >
            <Heading as="h3" className="col-span-3 md:col-span-7" level={3}>
              <FormattedMessage defaultMessage="Cómpralo en" id="BUY_IN" />
            </Heading>
            {checkout.slice(0, landing ? 3 : checkout.length).map((link, index) => {
              const key = link.name.split('-')[0].replace(/\s/g, '').toLowerCase();

              const asset = assets[key];

              return (
                asset && (
                  <a
                    aria-label={link.name}
                    className={cx(landing && index === 0 && 'md:col-start-3')}
                    href={link.url}
                    key={link.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={asset.title} className="h-16 object-contain" src={asset.url} />
                  </a>
                )
              );
            })}
          </div>
        )}
      </Content>
    </Section>
  );
};

export default Book;
