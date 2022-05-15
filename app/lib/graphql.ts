import { GraphQLClient } from 'graphql-request';
import type { RequestDocument } from 'graphql-request';
import type { Variables } from 'graphql-request/src/types';

const ENDPOINT = 'https://graphql.contentful.com/content/v1/spaces/v1kazl7nd6vv';

const production = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ua7edGKBMBvdZLon8l-UPGLwPXWgVob_ssQxzouGFzY`,
  },
});

const preview = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer yuhXXobbAe5U-wTMXCiUufmbJ_JPA1a2h7xVmu3D7f4`,
  },
});

function request<T = any, V = Variables>(query: RequestDocument, variables?: V): Promise<T> {
  return Object.keys(variables ?? {}).includes('preview')
    ? preview.request(query, variables)
    : production.request(query, variables);
}

export { gql } from 'graphql-request';

export default request;
