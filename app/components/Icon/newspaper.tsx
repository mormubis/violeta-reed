import type React from 'react';

type Props = React.ComponentPropsWithRef<'svg'>;

const newspaper = (props: Props) => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

newspaper.displayName = 'newspaper';

export default newspaper;
