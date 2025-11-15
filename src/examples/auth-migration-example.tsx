/**
 * EXAMPLE: Migration from manual types to generated types
 *
 * BEFORE (manual Apollo Client usage):
 */

// Old way with manual types and gql
import { gql } from '@apollo/client';

const SIGN_IN_OLD = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

const CURRENT_USER_OLD = gql`
  query CurrentUser($input: CurrentUserInput!) {
    currentUser(input: $input) {
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

// Manual types (to be replaced)
interface SignInTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

function OldAuthComponent() {
  const [signIn] = useMutation<{ signIn: { tokens: SignInTokens } }>(
    SIGN_IN_OLD
  );
  const { data } = useQuery<{ currentUser: { user: User } }>(CURRENT_USER_OLD, {
    variables: { input: {} },
  });

  return <div>Old implementation</div>;
}

/**
 * AFTER (with GraphQL Code Generator):
 */

// New way with generated types and operations
import { useQuery, useMutation } from '@apollo/client';
import { graphql } from '@/generated';

// These are automatically generated and fully typed!
const SignInMutation = graphql(`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`);

const CurrentUserQuery = graphql(`
  query CurrentUser($input: CurrentUserInput!) {
    currentUser(input: $input) {
      user {
        ...UserFragment
      }
    }
  }
`);

// Usage with full type safety - no manual types needed!
function NewAuthComponent() {
  // TypeScript automatically infers the return types
  const [signIn, { loading: signInLoading }] = useMutation(SignInMutation);
  const { data, loading } = useQuery(CurrentUserQuery, {
    variables: { input: {} },
  });

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn({
        variables: {
          input: { email, password },
        },
      });

      // Full type safety - TypeScript knows the structure!
      const tokens = result.data?.signIn?.tokens;
      if (tokens) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* TypeScript knows data.currentUser.user has all UserFragment fields */}
      {data?.currentUser?.user && (
        <p>
          Welcome, {data.currentUser.user.firstName}{' '}
          {data.currentUser.user.lastName}
        </p>
      )}
      <button
        onClick={() => handleSignIn('user@example.com', 'password')}
        disabled={signInLoading}
      >
        {signInLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </div>
  );
}

export { NewAuthComponent };
