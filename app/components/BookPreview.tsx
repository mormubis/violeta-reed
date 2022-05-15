import React, { useInsertionEffect } from 'react';
import cx from 'classnames';
import { useIntl } from 'react-intl';

import type { Book } from '~/api/books';

import Card from './Card';
import Cover from './Cover';
import HTML from './HTML';
import Link from './Link';
import Tag from './Tag';
import Icon from '~/components/Icon';
import Heading from '~/components/Heading';
import ByLine from '~/components/ByLine';

type OwnProps = {
  author?: string;
  href: string;
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Book & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Book>;

const BookPreview = ({
  author,
  className,
  cover,
  description,
  href,
  noTag = false,
  publishedAt,
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => {
  const intl = useIntl();

  useInsertionEffect(() => {
    if (document.getElementById('__html_book')) {
      return;
    }

    const style = document.createElement('style');
    style.id = '__html_book';
    style.innerHTML = `
      .HTML.book-preview p {
        margin: 0 0 10px 0;
      }
  `;

    document.head.appendChild(style);
  }, []);

  const label = intl.formatMessage({ id: 'BOOK', defaultMessage: 'Libro' });

  return (
    <Card
      className={cx(
        className,
        'md:grid md:grid-cols-[minmax(0,_1fr)_auto] md:grid-rows-[auto_minmax(0,_1fr)] md:pr-12 lg:gap-x-12',
      )}
    >
      {!noTag && <Tag className="absolute top-8 left-5 z-10" title={label} type="book" />}

      <header className={cx('flex flex-col md:col-span-2 lg:col-span-2', !noTag && 'pl-10 md:pl-10')}>
        <Link to={href}>
          <Heading as={TitleComponent} className="text-stone-900" level={3} underline>
            {title}
          </Heading>
        </Link>
        <ByLine author={author} className="text-xs" date={publishedAt ? new Date(publishedAt) : undefined} />
      </header>

      <HTML className="book-preview text-sm" content={description} />

      <Link to={href}>
        <Cover title={title} url={cover} />
      </Link>

      <Link
        to={href}
        aria-label={`Más información sobre ${title}`}
        className="absolute bottom-0 right-0 flex  h-12 w-12 items-center justify-center text-purple-400"
      >
        <Icon name="arrow-sm-right" />
      </Link>
    </Card>
  );
};

export default BookPreview;
