import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: 'app/**/*.graphql',
  generates: {
    'app/gql': {
      preset: 'client',
      plugins: [],
    },
  },
  overwrite: true,
  schema:
    'https://graphql.contentful.com/content/v1/spaces/v1kazl7nd6vv/environments/master',
};

export default config;
