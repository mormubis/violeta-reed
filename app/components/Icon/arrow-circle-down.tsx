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
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

arrowCircleDown.displayName = 'arrow-circle-down';

export default arrowCircleDown;
