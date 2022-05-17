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

import AboutMe from '~/components/AboutMe';
import LatestNews from '~/components/LatestNews';
import Page from '~/components/Page';
import PostPreview from '~/components/PostPreview';

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
    <Page>
      <Page.Heading>
        <FormattedMessage defaultMessage="Blog" id="BLOG" />
      </Page.Heading>

      <ul className="-mx-3 flex flex-col gap-5 md:mx-0">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview {...post} author="Violeta Reed" href={`/blog/${post.slug}`} />
          </li>
        ))}
      </ul>

      <Page.Sidebar>
        <AboutMe {...profile} />
        <LatestNews items={latest} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Blog;
