import React, { useInsertionEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import fetcher from '~/api/profile';
import type { Profile } from '~/api/profile';

import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Page from '~/components/Page';
import Tag from '~/components/Tag';

const loader: LoaderFunction = async () => {
  return fetcher();
};

const About = () => {
  const data = useLoaderData<Profile>();

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
      <HTML className="about" content={data.about} />
    </Page>
  );
};

export { loader };

export default About;
