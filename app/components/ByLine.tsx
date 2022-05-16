import React from 'react';

import cx from 'classnames';

type OwnProps = {
  author?: string;
  date?: Date;
};

type Props = OwnProps & Omit<React.ComponentPropsWithRef<'p'>, keyof OwnProps>;

const ByLine = ({ className, author, date, ...props }: Props) => (
  <p {...props} className={cx(className, 'inline-flex items-center gap-2 text-stone-500')}>
    {date && (
      <time className="bg-purple-100  p-1 text-stone-900" dateTime={date?.toJSON()}>
        {date?.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
      </time>
    )}
    {author && <span>{author}</span>}
  </p>
);

export default ByLine;
