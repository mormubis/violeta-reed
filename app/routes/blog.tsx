import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import type { Post } from '~/api/posts';
import postsFetcher from '~/api/posts';
import Page from '~/components/Page';
import PostPreview from '~/components/PostPreview';

import type { LoaderArgs } from '@remix-run/node';

type Data = {
  posts: Post[];
};

async function loader({ request }: LoaderArgs): Promise<Data> {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const posts = await postsFetcher({ preview });

  return { posts };
}

const Blog = () => {
  const { posts } = useLoaderData<Data>();

  return (
    <Page>
      <Page.Heading>
        <FormattedMessage defaultMessage="Blog" id="BLOG" />
      </Page.Heading>

      <ul className="-mx-3 flex flex-col gap-5 md:mx-0 md:grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview {...post} author="Violeta Reed" href={`/blog/${post.slug}`} />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export { loader };

export default Blog;
