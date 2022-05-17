import React from 'react';

import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Book } from '~/api/books';
import type { News } from '~/api/latest';

import ByLine from '~/components/ByLine';
import Card from '~/components/Card';
import Heading from '~/components/Heading';
import Link from '~/components/Link';

type Props = {
  items: News[];
};

const isBook = (item: any): item is Book => item.cover !== undefined;

const LatestNews = ({ items }: Props) => (
  <Card className="!border-0 !bg-transparent">
    <header>
      <Heading as="h3" className="!text-sm !font-bold uppercase" level={3}>
        <FormattedMessage id="LATEST_NEWS" defaultMessage="Últimas actualizaciones" />
      </Heading>
    </header>
    <ul className="flex flex-col gap-5 text-sm">
      {items.map((item) => {
        const image = isBook(item) ? item.cover : item.image;

        return (
          <li key={item.slug}>
            <Link
              className="grid grid-cols-[auto_1fr] gap-x-2"
              to={isBook(item) ? `/books/${item.slug}` : `/blog/${item.slug}`}
            >
              {image && <img alt={item.title} className="row-span-2 h-12 w-12 object-cover" src={image} />}
              <div className={cx('row-start-1', image ? 'col-start-2' : 'col-span-2 col-start-1')}>{item.title}</div>
              <ByLine className="text-xs" date={new Date(item.publishedAt!)} />
            </Link>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default LatestNews;
