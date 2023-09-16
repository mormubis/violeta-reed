import React from 'react';

import { useLoaderData } from '@remix-run/react';
import cx from 'classnames';

import fetcher from '~/api/posts';
import ByLine from '~/components/ByLine';
import HTML from '~/components/HTML';
import Page, { Heading, Section } from '~/components/Page';

import type { LoaderFunctionArgs } from '@remix-run/node';

async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [post] = await fetcher({ slug: params.slug, preview });

  return post;
}

const Post = () => {
  const { content = '', image, title, ...post } = useLoaderData<typeof loader>();

  const publishedAt = new Date(post.publishedAt);

  return (
    <Page>
      <header
        className={cx('text-center md:flex md:flex-col md:items-start md:justify-center md:text-left lg:items-start')}
      >
        <Heading className="!block">{title}</Heading>
        <ByLine author="Violeta Reed" className="text-xs" date={publishedAt} />
      </header>
      <Section className="-mx-3 flex flex-col gap-3 md:gap-6" style={{ '--color': '#6f1f63' } as React.CSSProperties}>
        <div className="row-span-2">
          <figure className="sticky top-48 rounded border border-purple-900 bg-white object-cover p-4">
            <img alt={title} src={image} />
          </figure>
        </div>
        <div className="md:order-3">
          <HTML className="lg:!prose-p:text-base flex flex-col prose-p:text-sm" content={content} />
        </div>
      </Section>
    </Page>
  );
};

export { loader };

export default Post;
