import { gql } from '@apollo/client';

export const CREATE_DRIVER_USER = gql`
  mutation CreateDriverUser($input: CreateDriverUserInput!) {
    createDriverUser(input: $input) {
      driverUser {
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
`;

export const CREATE_PARTNER_USER = gql`
  mutation CreatePartnerUser($input: CreatePartnerUserInput!) {
    createPartnerUser(input: $input) {
      partnerUser {
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
`;

export const ENABLE_USER = gql`
  mutation EnableUser($input: EnableUserInput!) {
    enableUser(input: $input) {
      _
    }
  }
`;

export const DISABLE_USER = gql`
  mutation DisableUser($input: DisableUserInput!) {
    disableUser(input: $input) {
      _
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const VERIFY_PHONE = gql`
  mutation VerifyPhone($input: VerifyPhoneInput!) {
    verifyPhone(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`;

export const SEND_EMAIL_VERIFICATION = gql`
  mutation SendEmailVerification($input: SendEmailVerificationInput!) {
    sendEmailVerification(input: $input) {
      _
    }
  }
`;

export const SEND_PHONE_VERIFICATION = gql`
  mutation SendPhoneVerification($input: SendPhoneVerificationInput!) {
    sendPhoneVerification(input: $input) {
      _
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      _
    }
  }
`;