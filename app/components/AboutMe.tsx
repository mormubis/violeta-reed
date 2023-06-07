import React from 'react';

import type { Profile as OwnProps } from '~/api/profile';
import type { Props as CardProps } from '~/components/Card';
import Card from '~/components/Card';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';

type Props = OwnProps & Omit<CardProps, keyof OwnProps>;

const AboutMe = ({ avatar, bio }: Props) => (
  <Card className="!border-0 !bg-transparent">
    <img
      alt="Violeta Reed"
      className="m-auto h-48 w-48 rounded-full border-4 border-solid border-purple-300 object-cover"
      src={avatar}
    />
    <HTML className="text-center" content={bio} />
    <a
      className="absolute bottom-5 left-0 flex w-full justify-center text-center motion-safe:animate-bounce md:hidden"
      href="#home"
    >
      <Icon className="h-8 text-stone-300" name="arrow-circle-down" />
    </a>
  </Card>
);

export default AboutMe;
