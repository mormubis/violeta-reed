import type React from 'react';

type Props = React.ComponentPropsWithRef<'svg'>;

const heart = (props: Props) => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    stroke="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

heart.displayName = 'heart';

export default heart;
