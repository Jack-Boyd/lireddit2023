
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        documentMode: "string",
        dedupeFragments: true,
      },
      presetConfig: {
        dedupeFragments: true,
        fragmentMasking: false,
      },
      plugins: []
    }
  }
};

export default config;
