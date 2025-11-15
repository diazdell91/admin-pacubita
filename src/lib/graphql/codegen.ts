import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.stag.pacubita.click/staff/v1/graphql",
  // NOTE: Queries and mutations files are generated on demand
  // To use codegen, create src/lib/graphql/queries.graphql and src/lib/graphql/mutations.graphql
  documents: [],
  generates: {
    "./src/lib/graphql/schema.json": {
      plugins: ["introspection"],
    },
  },
  hooks: {
    afterAllFileWrite: [
      'prettier --write'
    ]
  }
};

export default config;