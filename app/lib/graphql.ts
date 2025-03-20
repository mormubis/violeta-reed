import { GraphQLClient } from 'graphql-request';

import type {
  RequestDocument,
  RequestOptions,
  Variables,
} from 'graphql-request';

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN}`,
  },
});

function request<T, V extends Variables = Variables>(
  query: RequestDocument,
  variables: V,
): Promise<T> {
  return client.request({
    document: query,
    variables,
  } as unknown as RequestOptions<V, T>);
}

export default request;
