import React, { useInsertionEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';
import type { News } from '~/api/latest';
import latestFetcher from '~/api/latest';

import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Page from '~/components/Page';
import Tag from '~/components/Tag';
import AboutMe from '~/components/AboutMe';
import LatestNews from '~/components/LatestNews';

const loader: LoaderFunction = async () => {
  const [latest, profile] = await Promise.all([latestFetcher(), profileFetcher()]);

  return { latest, profile };
};

const About = () => {
  const { latest, profile } = useLoaderData<{ latest: News[]; profile: Profile }>();

  useInsertionEffect(() => {
    if (document.getElementById('__html_about')) {
      return;
    }

    const style = document.createElement('style');
    style.id = '__html_about';
    style.innerHTML = `
      .HTML.about {
        display: flex;
        flex-direction: column;
        font-weight: 300;
        gap: 12px;
        margin: 0 auto;
        max-width: 720px;
      }
      
      .HTML.about figure:first-child {
        margin-bottom: 12px;
      }
      
      .HTML.about p {
        font-size: 16px;
        line-height: 1.8;
        margin: 0;
      }
      
      @media (min-width: 768px) {
        .HTML.about p {
          font-size: 20px;
        }
      }
  `;

    document.head.appendChild(style);
  }, []);

  return (
    <Page>
      <Heading>
        <Tag type="profile" />
        <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
      </Heading>
      <HTML className="about" content={profile.about} />
      <div>
        <AboutMe {...profile} />
        <LatestNews items={latest} />
      </div>
    </Page>
  );
};

export { loader };

export default About;
