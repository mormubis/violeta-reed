import React from 'react';

type Props = React.ComponentPropsWithRef<'svg'>;

const arrowCircleDown = (props: Props) => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

arrowCircleDown.displayName = 'arrow-circle-down';

export default arrowCircleDown;
