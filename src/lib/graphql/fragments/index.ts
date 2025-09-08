import { gql } from '@apollo/client';

// User fragments
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    phone
    createdAt
  }
`;

// Order fragments
export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    code
    externalId
    serviceType
    status
    subtotal
    discount
    vat
    total
    createdAt
  }
`;

export const ORDER_CLIENT_FRAGMENT = gql`
  fragment OrderClientFragment on OrderClient {
    id
    firstName
    lastName
  }
`;

export const ORDER_DRIVER_FRAGMENT = gql`
  fragment OrderDriverFragment on OrderDriver {
    id
    firstName
    lastName
    vehicle {
      id
      make
      model
      year
      color
      plate
    }
  }
`;

export const ORDER_PARTNER_FRAGMENT = gql`
  fragment OrderPartnerFragment on OrderPartner {
    id
    name
  }
`;

export const ORDER_SENDER_FRAGMENT = gql`
  fragment OrderSenderFragment on OrderSender {
    firstName
    lastName
    phone
    email
    address {
      line1
      line2
      city
      state
      zipCode
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

export const ORDER_RECIPIENT_FRAGMENT = gql`
  fragment OrderRecipientFragment on OrderRecipient {
    firstName
    lastName
    phone
    email
    identityCardNumber
    address {
      line1
      line2
      neighborhood
      municipality
      province
      postalCode
      coordinates {
        latitude
        longitude
      }
    }
    notes
  }
`;

// Article fragments
export const ARTICLE_FRAGMENT = gql`
  fragment ArticleFragment on Article {
    id
    name
    description
    imagePath
    isEnabled
  }
`;

export const ARTICLE_VARIANT_FRAGMENT = gql`
  fragment ArticleVariantFragment on ArticleVariant {
    id
    name
    isEnabled
  }
`;

// Location fragments
export const COUNTRY_FRAGMENT = gql`
  fragment CountryFragment on Country {
    id
    name
  }
`;

export const STATE_FRAGMENT = gql`
  fragment StateFragment on State {
    id
    name
  }
`;

export const CITY_FRAGMENT = gql`
  fragment CityFragment on City {
    id
    name
    zipCodes
  }
`;

export const PROVINCE_FRAGMENT = gql`
  fragment ProvinceFragment on Province {
    id
    name
  }
`;

export const MUNICIPALITY_FRAGMENT = gql`
  fragment MunicipalityFragment on Municipality {
    id
    name
  }
`;

export const NEIGHBORHOOD_FRAGMENT = gql`
  fragment NeighborhoodFragment on Neighborhood {
    id
    name
  }
`;

// Pricing fragments
export const PRICING_RULE_FRAGMENT = gql`
  fragment PricingRuleFragment on IPricingRule {
    id
    type
    isEnabled
    price
    partner {
      id
      name
    }
    location {
      id
      name
    }
    deliveryType {
      id
      name
    }
  }
`;

// Delivery Type fragment
export const DELIVERY_TYPE_FRAGMENT = gql`
  fragment DeliveryTypeFragment on DeliveryType {
    id
    name
    icon
    description
    isEnabled
  }
`;