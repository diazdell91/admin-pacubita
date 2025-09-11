/**
 * REAL MIGRATION EXAMPLES - Updated to use Generated Types
 */

import { useQuery, useMutation } from '@apollo/client';
import { graphql } from '@/generated'; // Import the generated graphql function

// ✅ NEW WAY - Using generated operations with full type safety
export function OrdersPageNew() {
  // GraphQL operations are now fully typed!
  const { data, loading, error } = useQuery(
    graphql(`
      query GetOrders($input: OrdersInput!) {
        orders(input: $input) {
          total
          orders {
            ...OrderFragment
            client {
              ...OrderClientFragment
            }
            driver {
              ...OrderDriverFragment
            }
            partner {
              ...OrderPartnerFragment
            }
          }
        }
      }
    `),
    {
      variables: {
        input: {
          page: 1,
          limit: 10,
        },
      },
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Orders ({data?.orders.total})</h1>
      {data?.orders.orders.map((order) => (
        <div key={order.id}>
          {/* TypeScript knows all these properties exist! */}
          <p>Order #{order.code}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <p>
            Client: {order.client?.firstName} {order.client?.lastName}
          </p>
          {order.driver && (
            <p>
              Driver: {order.driver.firstName} {order.driver.lastName}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function AuthComponentNew() {
  const [signIn, { loading: signInLoading }] = useMutation(
    graphql(`
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          tokens {
            accessToken
            refreshToken
          }
        }
      }
    `)
  );

  const { data: userData } = useQuery(
    graphql(`
      query CurrentUser($input: CurrentUserInput!) {
        currentUser(input: $input) {
          user {
            ...UserFragment
          }
        }
      }
    `),
    {
      variables: { input: {} },
    }
  );

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn({
        variables: {
          input: { email, password },
        },
      });

      // Full type safety - TypeScript knows the exact structure!
      const tokens = result.data?.signIn?.tokens;
      if (tokens) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div>
      {userData?.currentUser?.user && (
        <p>Welcome, {userData.currentUser.user.firstName}!</p>
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

export function ArticlesComponentNew() {
  const { data, loading } = useQuery(
    graphql(`
      query GetArticles($input: ArticlesInput!) {
        articles(input: $input) {
          articles {
            ...ArticleFragment
            variants {
              ...ArticleVariantFragment
            }
          }
        }
      }
    `),
    {
      variables: {
        input: {
          page: 1,
          limit: 20,
        },
      },
    }
  );

  if (loading) return <div>Loading articles...</div>;

  return (
    <div>
      <h1>Articles</h1>
      {data?.articles.articles.map((article) => (
        <div key={article.id}>
          <h3>{article.name}</h3>
          <p>{article.description}</p>
          <p>Enabled: {article.isEnabled ? 'Yes' : 'No'}</p>
          {article.variants.length > 0 && (
            <div>
              <h4>Variants:</h4>
              {article.variants.map((variant) => (
                <span key={variant.id}>
                  {variant.name} ({variant.isEnabled ? 'Active' : 'Inactive'})
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * ❌ OLD WAY - Manual types (to be replaced)
 *
 * import { useQuery, gql } from '@apollo/client';
 *
 * const GET_ORDERS = gql`...`; // Manual gql template
 *
 * interface Order {
 *   id: string;
 *   code: string;
 *   // ... manual type definitions
 * }
 *
 * const { data } = useQuery<{ orders: { orders: Order[] } }>(GET_ORDERS);
 */
