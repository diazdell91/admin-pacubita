// Compatibility layer - re-export from the new GraphQL structure
export * from '@/lib/graphql';

// For backwards compatibility with old graphql() usage
export { gql as graphql } from '@apollo/client';