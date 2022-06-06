import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import HTML from '~/components/HTML';
import Page from '~/components/Page';

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
      <HTML className="about" content={profile.about} />
    </Page>
  );
};

export { loader };

export default About;
