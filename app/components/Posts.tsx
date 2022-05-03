import React from 'react';
import cx from 'classnames';

import type { Post } from '~/api/posts';

import PostPreview from '~/components/PostPreview';

type OwnProps = {
  items: Post[];
  noTag?: boolean;
  titleComponent?: React.ElementType;
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'ul'>, keyof OwnProps>;

const Posts = ({ className, items, noTag, titleComponent }: Props) => (
  <ul className={cx(className, 'flex flex-col gap-5 lg:grid lg:grid-cols-2')}>
    {items.map((post) => (
      <li key={post.slug}>
        <PostPreview
          {...post}
          author="Violeta Reed"
          href={`/blog/${post.slug}`}
          noTag={noTag}
          titleComponent={titleComponent}
        />
      </li>
    ))}
  </ul>
);

export default Posts;
