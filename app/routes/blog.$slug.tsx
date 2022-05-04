import React from 'react';

import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import fetcher from '~/api/posts';
import type { Post as PostType } from '~/api/posts';

import ByLine from '~/components/ByLine';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Page from '~/components/Page';
import Tags from '~/components/PostPreview/Tags';

const loader: LoaderFunction = async ({ params }) => {
  const [post] = await fetcher({ slug: params.slug });

  return post;
};

const Post = () => {
  const { content = '', image, tags, title, ...post } = useLoaderData<PostType>();

  const publishedAt = new Date(post.publishedAt);

  return (
    <Page>
      <article className="flex flex-col gap-2">
        <header className="text-center md:text-left">
          <Heading className="!block">{title}</Heading>
          <ByLine author="Violeta Reed" className="text-xs" date={publishedAt} />
        </header>
        {image && (
          <figure className="relative -mx-3">
            <img className="block rounded-sm" src={image} alt={title} />
            <Tags className="absolute bottom-2 left-4" items={tags} />
          </figure>
        )}
        <HTML className="flex flex-col" content={content} />
      </article>
    </Page>
  );
};

export { loader };

export default Post;
