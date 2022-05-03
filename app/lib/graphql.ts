import { GraphQLClient } from 'graphql-request';
import type { RequestDocument } from 'graphql-request';
import type { Variables } from 'graphql-request/src/types';

const ENDPOINT = 'https://graphql.contentful.com/content/v1/spaces/v1kazl7nd6vv';

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ua7edGKBMBvdZLon8l-UPGLwPXWgVob_ssQxzouGFzY`,
  },
});

function request<T = any, V = Variables>(query: RequestDocument, variables?: V): Promise<T> {
  return client.request(query, variables);
}

export { gql } from 'graphql-request';

export default request;
