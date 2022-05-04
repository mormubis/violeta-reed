import React from 'react';

import { FormattedMessage } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import fetcher from '~/api/posts';
import type { Post } from '~/api/posts';

import Heading from '~/components/Heading';
import Page from '~/components/Page';
import Posts from '~/components/Posts';
import Tag from '~/components/Tag';

const loader: LoaderFunction = async () => fetcher();

const Blog = () => {
  const data = useLoaderData<Post[]>();

  return (
    <Page className="bg-slate-50">
      <Heading>
        <Tag type="post" />
        <FormattedMessage defaultMessage="Últimos posts" id="LASTEST_POSTS" />
      </Heading>
      <Posts items={data} noTag />
    </Page>
  );
};

export { loader };

export default Blog;
