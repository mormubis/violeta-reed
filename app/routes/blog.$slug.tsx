import React from 'react';
import cx from 'classnames';

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
      <article className="flex flex-col gap-2 md:grid md:grid-cols-[auto_minmax(0,_1fr)] md:gap-x-0">
        <header
          className={cx(
            'text-center md:order-2 md:flex md:flex-col md:items-start md:justify-center md:border-b md:border-r md:bg-white md:p-5 md:text-left lg:items-start',
            !image && 'col-span-2',
          )}
        >
          <Heading className="!block">{title}</Heading>
          <ByLine author="Violeta Reed" className="text-xs" date={publishedAt} />
        </header>
        {image && (
          <figure className="relative -mx-3 md:order-1 md:m-0 md:border-b">
            <img
              className="block w-full rounded-sm object-cover md:h-[250px] md:w-[250px] lg:h-[350px] lg:w-[350px]"
              src={image}
              alt={title}
            />
            <Tags className="absolute bottom-2 left-4" items={tags} />
          </figure>
        )}
        <HTML className="flex flex-col md:order-3 md:col-span-2" content={content} />
      </article>
    </Page>
  );
};

export { loader };

export default Post;
