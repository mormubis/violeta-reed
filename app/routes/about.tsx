import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { News } from '~/api/latest';
import latestFetcher from '~/api/latest';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import HTML from '~/components/HTML';
import LatestNews from '~/components/LatestNews';
import Page from '~/components/Page';

const loader: LoaderFunction = async () => {
  const [latest, profile] = await Promise.all([latestFetcher(), profileFetcher()]);

  return { latest, profile };
};

const About = () => {
  const { latest, profile } = useLoaderData<{ latest: News[]; profile: Profile }>();

  return (
    <Page>
      <Page.Heading>
        <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
      </Page.Heading>
      <HTML className="about" content={profile.about} />
      <Page.Sidebar>
        <AboutMe {...profile} />
        <LatestNews items={latest} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default About;
