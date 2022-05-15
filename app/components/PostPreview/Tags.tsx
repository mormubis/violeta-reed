import React from 'react';

import cx from 'classnames';

import type { Tag } from '~/api/posts';

import Chip from '~/components/Chip';
import Link from '~/components/Link';

type OwnProps = {
  items: Tag[];
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'ul'>, keyof OwnProps>;

const Tags = ({ className, items, ...props }: Props) => (
  <ul {...props} className={cx(className, 'flex gap-1')}>
    {items.map((item: Tag) => (
      <Chip as="li" key={item.slug}>
        <Link className="!text-stone-900" to={`/blog/category/${item.slug}`}>
          {item.name}
        </Link>
      </Chip>
    ))}
  </ul>
);

export default Tags;
