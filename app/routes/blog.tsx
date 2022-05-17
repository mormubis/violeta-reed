import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Post } from '~/api/posts';
import postsFetcher from '~/api/posts';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import Page from '~/components/Page';
import PostPreview from '~/components/PostPreview';

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [posts, profile] = await Promise.all([postsFetcher({ preview }), profileFetcher({ preview })]);

  return { posts, profile };
};

const Blog = () => {
  const { posts, profile } = useLoaderData<{ posts: Post[]; profile: Profile }>();

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
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Blog;
