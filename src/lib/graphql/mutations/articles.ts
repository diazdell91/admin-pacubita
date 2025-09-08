import { gql } from '@apollo/client';
import { ARTICLE_FRAGMENT, ARTICLE_VARIANT_FRAGMENT, DELIVERY_TYPE_FRAGMENT } from '../fragments';

// Article mutations
export const CREATE_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      article {
        ...ArticleFragment
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      article {
        ...ArticleFragment
      }
    }
  }
`;

// Article Variant mutations
export const CREATE_ARTICLE_VARIANT = gql`
  ${ARTICLE_VARIANT_FRAGMENT}
  mutation CreateArticleVariant($input: CreateArticleVariantInput!) {
    createArticleVariant(input: $input) {
      articleVariant {
        ...ArticleVariantFragment
      }
    }
  }
`;

export const UPDATE_ARTICLE_VARIANT = gql`
  ${ARTICLE_VARIANT_FRAGMENT}
  mutation UpdateArticleVariant($input: UpdateArticleVariantInput!) {
    updateArticleVariant(input: $input) {
      articleVariant {
        ...ArticleVariantFragment
      }
    }
  }
`;

// Delivery Type mutations
export const CREATE_DELIVERY_TYPE = gql`
  ${DELIVERY_TYPE_FRAGMENT}
  mutation CreateDeliveryType($input: CreateDeliveryTypeInput!) {
    createDeliveryType(input: $input) {
      deliveryType {
        ...DeliveryTypeFragment
      }
    }
  }
`;

export const UPDATE_DELIVERY_TYPE = gql`
  ${DELIVERY_TYPE_FRAGMENT}
  mutation UpdateDeliveryType($input: UpdateDeliveryTypeInput!) {
    updateDeliveryType(input: $input) {
      deliveryType {
        ...DeliveryTypeFragment
      }
    }
  }
`;