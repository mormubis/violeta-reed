declare module '*.graphql' {
  import type { RequestDocument } from 'graphql-request';
  const Schema: RequestDocument;

  export = Schema;
}
