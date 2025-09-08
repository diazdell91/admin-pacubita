import { gql } from '@apollo/client';
import {
  ORDER_FRAGMENT,
  ORDER_CLIENT_FRAGMENT,
  ORDER_DRIVER_FRAGMENT,
  ORDER_PARTNER_FRAGMENT,
  ORDER_SENDER_FRAGMENT,
  ORDER_RECIPIENT_FRAGMENT
} from '../fragments';

export const GET_ORDERS = gql`
  ${ORDER_FRAGMENT}
  ${ORDER_CLIENT_FRAGMENT}
  ${ORDER_DRIVER_FRAGMENT}
  ${ORDER_PARTNER_FRAGMENT}
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
`;

export const GET_ORDER = gql`
  ${ORDER_FRAGMENT}
  ${ORDER_CLIENT_FRAGMENT}
  ${ORDER_DRIVER_FRAGMENT}
  ${ORDER_PARTNER_FRAGMENT}
  ${ORDER_SENDER_FRAGMENT}
  ${ORDER_RECIPIENT_FRAGMENT}
  query GetOrder($input: OrderInput!) {
    order(input: $input) {
      order {
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
        sender {
          ...OrderSenderFragment
        }
        recipient {
          ...OrderRecipientFragment
        }
        paymentMethod {
          ... on OrderCard {
            id
            type
            brand
            last4
            expMonth
            expYear
          }
          ... on OrderPartnerBalance {
            id
            type
          }
        }
        addons {
          ... on OrderHomePickupAddon {
            id
            type
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
            total
          }
          ... on OrderHomeWrappingAddon {
            id
            type
            price
            freeThresholdAmount
            date
            hourRange {
              startAt
              endAt
            }
            total
          }
        }
        items {
          id
          quantity
          total
          product {
            ... on OrderLuggage {
              type
              price
              size {
                id
                price
              }
            }
            ... on OrderArticle {
              type
              price
              id
              name
              description
              imagePath
              variant {
                id
                name
              }
              deliveryType {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;