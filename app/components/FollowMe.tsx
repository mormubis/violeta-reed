import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { Profile as OwnProps } from '~/api/profile';

import type { Props as CardProps } from '~/components/Card';
import Card from '~/components/Card';
import Header from '~/components/Header';
import Heading from '~/components/Heading';
import Icon from '~/components/Icon';

type Props = OwnProps & Omit<CardProps, keyof OwnProps>;

const FollowMe = ({ social }: Props) => (
  <Card className="gap-10">
    <Header>
      <Heading as="h3" level={3}>
        <FormattedMessage id="FOLLOW_ME" defaultMessage="Sígueme" />
      </Heading>
    </Header>
    <ul className="flex justify-center gap-5">
      {social.map((link) => (
        <li key={link.name}>
          <a className="py-2" href={link.url}>
            <Icon className="h-6" name={link.name as 'facebook'} />
          </a>
        </li>
      ))}
      <li key={1}>
        <a className="py-2" href={'hello'}>
          <Icon className="h-6" name={'instagram' as 'facebook'} />
        </a>
      </li>
      <li key={2}>
        <a className="py-2" href={'hello'}>
          <Icon className="h-6" name={'instagram' as 'facebook'} />
        </a>
      </li>
      <li key={3}>
        <a className="py-2" href={'hello'}>
          <Icon className="h-6" name={'instagram' as 'facebook'} />
        </a>
      </li>
      <li key={4}>
        <a className="py-2" href={'hello'}>
          <Icon className="h-6" name={'instagram' as 'facebook'} />
        </a>
      </li>
      <li key={5}>
        <a className="py-2" href={'hello'}>
          <Icon className="h-6" name={'instagram' as 'facebook'} />
        </a>
      </li>
    </ul>
  </Card>
);

export default FollowMe;
