import React from 'react';

type Props = React.ComponentPropsWithRef<'svg'>;

const bookmark = (props: Props) => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    stroke="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

bookmark.displayName = 'bookmark';

export default bookmark;
