import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { Book } from '~/api/books';
import type { News } from '~/api/latest';

import ByLine from '~/components/ByLine';
import Card from '~/components/Card';
import Header from '~/components/Header';
import Heading from '~/components/Heading';
import Link from '~/components/Link';

type Props = {
  items: News[];
};

const isBook = (item: any): item is Book => item.cover !== undefined;

const LatestNews = ({ items }: Props) => (
  <Card className="gap-10">
    <Header>
      <Heading as="h3" level={3}>
        <FormattedMessage id="LATEST_NEWS" defaultMessage="Últimas actualizaciones" />
      </Heading>
    </Header>
    <ul className="flex flex-col gap-5 text-sm">
      {items.map((item) => {
        const image = isBook(item) ? item.cover : item.image;

        return (
          <li key={item.slug}>
            <Link
              className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-2"
              to={isBook(item) ? `/books/${item.slug}` : `/blog/${item.slug}`}
            >
              {image && <img className="row-span-2 h-12 w-12 object-cover" alt={item.title} src={image} />}
              <Heading className={cx('col-start-1', image && '!col-span-1 ')} level={4}>
                {item.title}
              </Heading>
              <ByLine className="text-xs" date={new Date(item.publishedAt!)} />
            </Link>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default LatestNews;
