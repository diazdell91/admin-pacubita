import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.stag.pacubita.click/staff/v1/graphql",
  documents: [
    "src/lib/graphql/mutations.graphql", 
    "src/lib/graphql/queries.graphql"
  ],
  generates: {
    "./src/lib/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
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