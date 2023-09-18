import React from 'react';

import cx from 'classnames';

import context from './context';

type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  index?: number;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'section';

const { Provider } = context;

const Section = <E extends React.ElementType = typeof defaultElement>({
  as,
  className,
  index = 0,
  ...props
}: Props<E>) => {
  const Component = as ?? defaultElement;
  const isEven = (index ?? 0) % 2 === 1;

  return (
    <Provider value={index}>
      <Component
        {...props}
        className={cx(
          className,
          'relative flex flex-col gap-x-16 gap-y-3 px-3 py-5 pt-10 before:absolute before:left-0 before:top-0 before:-z-10 before:h-64 before:w-full before:bg-[color:var(--color)] before:opacity-80 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:bg-[color:var(--color)] after:opacity-10 md:grid md:grid-cols-[35%_1fr] md:grid-rows-[auto_1fr] md:gap-y-5 md:px-16 md:py-16 md:before:left-auto md:before:right-3/4 md:before:h-full md:before:w-screen md:after:right-0 md:after:w-screen lg:after:left-1/4',
          isEven &&
            'md:!grid-cols-[1fr_35%] md:!flex-row-reverse md:before:!left-3/4 md:before:!right-auto md:after:!left-auto md:after:!right-1/4 ',
        )}
      ></Component>
    </Provider>
  );
};

export { default as Content } from './Content';
export { default as Image } from './Image';
export { default as Title } from './Title';

export default Section;
