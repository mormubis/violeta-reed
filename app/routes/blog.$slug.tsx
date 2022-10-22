import React from 'react';

import { useLoaderData } from '@remix-run/react';
import cx from 'classnames';

import fetcher from '~/api/posts';
import type { Post as PostType } from '~/api/posts';
import ByLine from '~/components/ByLine';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Page from '~/components/Page';

import type { LoaderFunction } from '@remix-run/node';

const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [post] = await fetcher({ slug: params.slug, preview });

  return post;
};

const Post = () => {
  const { content = '', image, title, ...post } = useLoaderData<PostType>();

  const publishedAt = new Date(post.publishedAt);

  return (
    <Page>
      <article className="flex flex-col gap-3 md:gap-6">
        <header
          className={cx(
            'text-center md:order-2 md:flex md:flex-col md:items-start md:justify-center md:text-left lg:items-start',
            !image && 'col-span-2',
          )}
        >
          <Heading className="!block">{title}</Heading>
          <ByLine author="Violeta Reed" className="text-xs" date={publishedAt} />
        </header>
        <HTML className="flex flex-col md:order-3 md:col-span-2" content={content} />
      </article>
    </Page>
  );
};

export { loader };

export default Post;
