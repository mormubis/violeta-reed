import React from 'react';

import { useLoaderData } from '@remix-run/react';
import { FormattedMessage } from 'react-intl';

import postsFetcher from '~/api/posts';
import Page, { Heading } from '~/components/Page';
import PostPreview from '~/components/PostPreview';

import type { LoaderFunctionArgs } from '@remix-run/node';

async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const posts = await postsFetcher({ preview });

  return { posts };
}

const Blog = () => {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Heading>
        <FormattedMessage defaultMessage="Blog" id="BLOG" />
      </Heading>

      <ul className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview {...post} author="Violeta Reed" className="self-stretch" href={`/blog/${post.slug}`} />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export { loader };

export default Blog;
