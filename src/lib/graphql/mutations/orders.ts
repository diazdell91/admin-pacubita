import { gql } from '@apollo/client';

export const DROP_OFF_ORDER = gql`
  mutation DropOffOrder($input: DropOffOrderInput!) {
    dropOffOrder(input: $input) {
      _
    }
  }
`;