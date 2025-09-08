import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

export const CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query CurrentUser($input: CurrentUserInput!) {
    currentUser(input: $input) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut($input: SignOutInput!) {
    signOut(input: $input) {
      _
    }
  }
`;

export const REFRESH_TOKENS = gql`
  mutation RefreshTokens($input: RefreshTokensInput!) {
    refreshTokens(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;