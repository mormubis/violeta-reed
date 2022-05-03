import React from 'react';
import cx from 'classnames';

import type { Post } from '~/api/posts';

import ByLine from '~/components/ByLine';
import Card from '~/components/Card';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';
import Link from '~/components/Link';
import Tag from '~/components/Tag';

import Tags from './Tags';

type OwnProps = {
  author?: string;
  href: string;
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Post & Omit<React.ComponentPropsWithoutRef<'article'>, keyof OwnProps | keyof Post>;

const PostPreview = ({
  abstract,
  author,
  className,
  href,
  image,
  modifiedAt,
  noTag,
  publishedAt = modifiedAt,
  tags = [],
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => {
  return (
    <Card
      className={cx(
        className,
        'md:grid-row-2 md:grid md:h-64 md:grid-cols-[auto_minmax(0,_1fr)] md:gap-x-4',
        !image && 'md:grid-rows-[auto_minmax(0,_1fr)_auto]',
      )}
    >
      {!noTag && <Tag className={cx('absolute top-2 left-2 z-10', !image && 'top-8 left-5')} type="post" />}

      {image ? (
        <figure className="relative -mx-6 -mt-6 md:row-span-2 md:-my-6 md:mr-0  md:w-64">
          <img className="block h-full object-cover" src={image} alt={title} />
          <Tags className="absolute bottom-2 right-4 md:bottom-4 md:right-auto md:left-4" items={tags} />
        </figure>
      ) : (
        <Tags className="order-3 md:bottom-4 md:right-auto md:left-4" items={tags} />
      )}

      <header className={cx('mt-3 flex flex-col md:m-0 md:px-0', !image && 'col-span-2 mt-0 pl-10 md:pl-10')}>
        <Link to={href}>
          <TitleComponent className="mb-1 text-lg font-semibold text-stone-900">{title}</TitleComponent>
        </Link>
        <ByLine author={author} className="text-xs" date={new Date(publishedAt ?? modifiedAt)} />
      </header>

      <HTML
        className={cx(
          'mb-3 overflow-hidden text-ellipsis text-sm line-clamp-4 md:mb-8 md:line-clamp-6',
          !image && 'col-span-2 md:mb-0',
        )}
        content={abstract ?? ''}
      />

      <Link
        to={href}
        aria-label="Leer más"
        className="absolute bottom-0 right-0 flex  h-12 w-12 items-center justify-center text-purple-400"
      >
        <Icon name="arrow-sm-right" />
      </Link>
    </Card>
  );
};

export default PostPreview;
