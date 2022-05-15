import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { Profile as OwnProps } from '~/api/profile';

import type { Props as CardProps } from '~/components/Card';
import Card from '~/components/Card';
import Header from '~/components/Header';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';

type Props = OwnProps & Omit<CardProps, keyof OwnProps>;

const AboutMe = ({ avatar, bio }: Props) => (
  <Card className="gap-10">
    <Header>
      <Heading as="h3" level={3}>
        <FormattedMessage id="ABOUT_ME" defaultMessage="Sobre mí" />
      </Heading>
    </Header>
    <img
      alt="Violeta Reed"
      className="m-auto h-56 w-56 rounded-full border-4 border-solid border-purple-200 object-cover"
      src={avatar}
    />
    <HTML className="text-center" content={bio} />
    <a
      className="absolute left-0 bottom-5 flex w-full justify-center text-center motion-safe:animate-bounce md:hidden"
      href="#home"
    >
      <Icon className="h-8 text-stone-300" name="arrow-circle-down" />
    </a>
  </Card>
);

export default AboutMe;
