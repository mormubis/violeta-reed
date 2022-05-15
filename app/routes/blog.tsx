import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { News } from '~/api/latest';
import latestFetcher from '~/api/latest';
import type { Post } from '~/api/posts';
import postsFetcher from '~/api/posts';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import Heading from '~/components/Heading';
import Page from '~/components/Page';
import Posts from '~/components/Posts';
import Tag from '~/components/Tag';
import AboutMe from '~/components/AboutMe';
import LatestNews from '~/components/LatestNews';

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [latest, posts, profile] = await Promise.all([
    latestFetcher({ preview }),
    postsFetcher({ preview }),
    profileFetcher({ preview }),
  ]);

  return { latest, posts, profile };
};

const Blog = () => {
  const { latest, posts, profile } = useLoaderData<{ latest: News[]; posts: Post[]; profile: Profile }>();

  return (
    <Page className="bg-slate-50">
      <Heading className="lg:col-span-2">
        <Tag type="post" />
        <FormattedMessage defaultMessage="Últimos posts" id="LASTEST_POSTS" />
      </Heading>
      <Posts items={posts} noTag />
      <Page.Sidebar>
        <AboutMe {...profile} />
        <LatestNews items={latest} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Blog;
