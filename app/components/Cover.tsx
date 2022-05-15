import React from 'react';

type OwnProps = {
  title: string;
  url: string;
};

type Props = OwnProps & Omit<React.ComponentPropsWithoutRef<'img'>, keyof OwnProps>;

const Cover = ({ title, url, ...props }: Props) => (
  <img
    {...props}
    alt={title}
    className="block h-[256px] w-[168px] rounded border border-solid border-gray-300 object-cover"
    src={url}
  />
);

export default Cover;
