import React from 'react';

import cx from 'classnames';
import { useIntl } from 'react-intl';

import type { Book } from '~/api/books';

import ByLine from '~/components/ByLine';
import Heading from '~/components/Heading';
import Icon from '~/components/Icon';

import Card from './Card';
import Cover from './Cover';
import HTML from './HTML';
import Link from './Link';

type OwnProps = {
  author?: string;
  href: string;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Book & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Book>;

const BookPreview = ({
  author,
  className,
  cover,
  href,
  publishedAt,
  synopsis,
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => {
  const intl = useIntl();

  const moreInfo = intl.formatMessage(
    { id: 'MORE_INFO_%TITLE%', defaultMessage: 'Más información sobre {title}' },
    { title },
  );

  return (
    <Card
      className={cx(className, 'md:pr-12')}
      title={
        <Link to={href}>
          <Heading as={TitleComponent} className="flex gap-3" level={3}>
            {title}
          </Heading>
        </Link>
      }
    >
      <div className="grid gap-3 md:grid-cols-[minmax(0,_1fr)_auto] md:grid-rows-[auto_minmax(0,_1fr)] lg:gap-x-12">
        <HTML className="text-sm" content={synopsis} />
        <Link to={href}>
          <Cover title={cover.description ?? title} url={cover.url} />
        </Link>
      </div>

      <ByLine author={author} className="text-xs" date={publishedAt ? new Date(publishedAt) : undefined} />

      <Link
        aria-label={moreInfo}
        className="absolute bottom-0 right-0 flex  h-12 w-12 items-center justify-center text-purple-400"
        to={href}
      >
        <Icon name="arrow-sm-right" />
      </Link>
    </Card>
  );
};

export default BookPreview;
