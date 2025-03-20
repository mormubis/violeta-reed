import { clsx as cx } from 'clsx';
import { useIntl } from 'react-intl';

import ByLine from '~/components/ByLine';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';

import type React from 'react';
import type { Post } from '~/api/posts';

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
  ...props
}: Props) => {
  const intl = useIntl();
  const label = intl.formatMessage({ id: 'READ_MORE', defaultMessage: 'Leer más' });

  return (
    <article
      {...props}
      className={cx(
        className,
        'relative flex flex-col gap-3 border-[color:var(--color)] border md:rounded-sm before:absolute before:top-0 before:-z-10 before:bg-[color:var(--color)] before:opacity-80 before:left-auto before:right-[90%] before:h-full before:w-screen overflow-hidden',
      )}
      style={{ '--color': '#6f1f63' } as React.CSSProperties}
    >
      {/* Image */}
      {image && (
        <figure className="border-b border-purple-700">
          <img alt={title} className="aspect-video object-cover saturate-150" src={image} />
        </figure>
      )}

      <section className="grid gap-2 p-3 pl-[calc(10%+0.75rem)]">
        {/* Title */}
        <Link to={href}>
          <Heading as={TitleComponent} className="flex gap-3" level={3}>
            {title}
          </Heading>
        </Link>

        <HTML
          className="prose-sm line-clamp-4 overflow-hidden text-ellipsis md:mb-8 md:line-clamp-6"
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
      </section>
    </article>
  );
};

export default PostPreview;
