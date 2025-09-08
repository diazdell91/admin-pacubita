import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($input: UsersInput!) {
    users(input: $input) {
      total
      users {
        ... on ClientUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on DriverUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on PartnerUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on StaffUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($input: UserInput!) {
    user(input: $input) {
      user {
        ... on ClientUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on DriverUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on PartnerUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
        ... on StaffUser {
          id
          type
          isEnabled
          partner {
            id
            name
          }
          firstName
          lastName
          email
          isEmailVerified
          phone
          isPhoneVerified
          createdAt
        }
      }
    }
  }
`;