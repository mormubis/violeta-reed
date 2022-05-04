import type { PostsQuery, PostsQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type LoaderParams = {
  index?: number;
  limit?: number;
  slug?: string;
};

type Tag = {
  slug: string;
  name: string;
};

type Post = {
  abstract?: string;
  content?: string;
  image?: string;
  modifiedAt: string;
  publishedAt: string;
  slug: string;
  tags: Tag[];
  title: string;
};

const fragment = gql`
  fragment PostContentLinks on PostContentLinks {
    assets {
      block {
        contentType
        description
        height
        sys {
          id
        }
        title
        url
        width
      }
    }
    entries {
      block {
        __typename
        sys {
          id
        }
      }
    }
  }
`;

const query = gql`
  ${fragment}
  query Posts($limit: Int, $index: Int, $slug: String) {
    postCollection(limit: $limit, order: sys_publishedAt_DESC, skip: $index, where: { slug: $slug }) {
      items {
        sys {
          firstPublishedAt
          id
          publishedAt
        }
        content {
          json
          links {
            ...PostContentLinks
          }
        }
        image {
          url
        }
        slug
        tagsCollection {
          items {
            name
            slug
          }
        }
        title
      }
    }
  }
`;

async function loader({ index = 0, limit = 8, slug }: LoaderParams = {}): Promise<Post[]> {
  const { postCollection } = await graphql<PostsQuery, PostsQueryVariables>(query, { limit, index, slug });

  return (
    postCollection?.items
      .map((item) => item!)
      .map((item) => {
        const blocks = item?.content?.json?.content ?? [];

        const paragraph = blocks.find((block: any) => block.nodeType === 'paragraph');
        const abstract = richTextToHTML(paragraph);

        const tags = item.tagsCollection?.items ?? [];

        return {
          abstract: abstract,
          content: richTextToHTML(item?.content?.json, item.content?.links),
          image: item.image?.url!,
          modifiedAt: item.sys.publishedAt,
          publishedAt: item.sys.firstPublishedAt,
          slug: item.slug!,
          tags: tags.map((tag) => tag!).map((tag) => ({ slug: tag.slug!, name: tag.name! })),
          title: item.title!,
        };
      }) ?? []
  );
}

export type { Post, Tag };

export default loader;
