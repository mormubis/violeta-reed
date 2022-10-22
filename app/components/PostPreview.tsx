import React from 'react';

import cx from 'classnames';
import { useIntl } from 'react-intl';

import type { Post } from '~/api/posts';
import ByLine from '~/components/ByLine';
import Card from '~/components/Card';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';
import Link from '~/components/Link';

type OwnProps = {
  author?: string;
  href: string;
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
  publishedAt = modifiedAt,
  title,
  titleComponent: TitleComponent = 'h2',
}: Props) => {
  const intl = useIntl();

  const label = intl.formatMessage({ id: 'READ_MORE', defaultMessage: 'Leer más' });

  return (
    <Card
      className={cx(className, 'pb-8')}
      image={image && { description: title, url: image }}
      title={
        <Link to={href}>
          <Heading as={TitleComponent} className="flex gap-3" level={3}>
            {title}
          </Heading>
        </Link>
      }
    >
      <HTML
        className="prose-sm overflow-hidden text-ellipsis line-clamp-4 md:mb-8 md:line-clamp-6"
        content={abstract ?? ''}
      />

      <ByLine author={author} className="text-xs" date={new Date(publishedAt ?? modifiedAt)} />

      <Link
        aria-label={label}
        className="absolute bottom-0 right-0 flex  h-12 w-12 items-center justify-center text-purple-400"
        title={label}
        to={href}
      >
        <Icon name="arrow-sm-right" />
      </Link>
    </Card>
  );
};

export default PostPreview;
