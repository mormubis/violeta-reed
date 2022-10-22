import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';
import HTML from '~/components/HTML';
import Page from '~/components/Page';

import type { LoaderFunction } from '@remix-run/node';

type Data = { profile: Profile };

const loader: LoaderFunction = async (): Promise<Data> => {
  const profile = await profileFetcher();

  return { profile };
};

const About = () => {
  const { profile } = useLoaderData<Data>();

  return (
    <Page>
      <Page.Heading>
        <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
      </Page.Heading>
      <HTML content={profile.about} />
    </Page>
  );
};

export { loader };

export default About;
