import type React from 'react';

type Props = React.ComponentPropsWithRef<'svg'>;

const menu = (props: Props) => (
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
      d="M4 6h16M4 12h16M4 18h16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

menu.displayName = 'menu';

export default menu;
