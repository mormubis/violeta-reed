import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import HTML from '~/components/HTML';
import Page from '~/components/Page';

const loader: LoaderFunction = async () => {
  const [profile] = await Promise.all([profileFetcher()]);

  return { profile };
};

const About = () => {
  const { profile } = useLoaderData<{ profile: Profile }>();

  return (
    <Page>
      <Page.Heading>
        <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
      </Page.Heading>
      <HTML className="about" content={profile.about} />
      <Page.Sidebar>
        <AboutMe {...profile} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default About;
