import type { PostsQuery, PostsQueryVariables } from '~/.graphql/types';

import cache from '~/lib/cache';
import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

type LoaderParams = {
  index?: number;
  limit?: number;
  preview?: boolean;
  slug?: string;
};

type Post = {
  abstract?: string;
  content?: string;
  image?: string;
  modifiedAt: string;
  publishedAt: string;
  slug: string;
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
  query Posts($limit: Int, $index: Int, $preview: Boolean, $slug: String) {
    postCollection(limit: $limit, preview: $preview, skip: $index, where: { slug: $slug }) {
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
          url(transform: { format: WEBP })
        }
        slug
        title
      }
    }
  }
`;

async function loader({ index = 0, limit = 8, preview = false, slug }: LoaderParams = {}): Promise<Post[]> {
  if (cache.has(`post:${index}-${limit}-${slug}`) && !preview) {
    return cache.get<Post[]>(`post:${index}-${limit}-${slug}`)!;
  }

  const { postCollection } = await graphql<PostsQuery, PostsQueryVariables>(query, { limit, index, preview, slug });

  const data =
    postCollection?.items
      .map((item) => item!)
      .map((item) => {
        const blocks = item?.content?.json?.content ?? [];

        const paragraph = blocks.find((block: any) => block.nodeType === 'paragraph');
        const abstract = richTextToHTML(paragraph);

        return {
          abstract: abstract,
          content: richTextToHTML(item?.content?.json, item.content?.links),
          image: item.image?.url!,
          modifiedAt: item.sys.publishedAt,
          publishedAt: item.sys.firstPublishedAt,
          slug: item.slug!,
          title: item.title!,
        };
      }) ?? [];

  if (!preview) {
    cache.set(`post:${index}-${limit}-${slug}`, data);
  } else {
    cache.delete(`post:${index}-${limit}-${slug}`);
  }

  return data;
}

export type { Post };

export default loader;
