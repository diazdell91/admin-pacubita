import { gql } from '@apollo/client';
import { ARTICLE_FRAGMENT, ARTICLE_VARIANT_FRAGMENT, DELIVERY_TYPE_FRAGMENT } from '../fragments';

export const GET_ARTICLES = gql`
  ${ARTICLE_FRAGMENT}
  ${ARTICLE_VARIANT_FRAGMENT}
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
`;

export const GET_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  ${ARTICLE_VARIANT_FRAGMENT}
  query GetArticle($input: ArticleInput!) {
    article(input: $input) {
      article {
        ...ArticleFragment
        variants {
          ...ArticleVariantFragment
        }
      }
    }
  }
`;

export const GET_DELIVERY_TYPES = gql`
  ${DELIVERY_TYPE_FRAGMENT}
  query GetDeliveryTypes($input: DeliveryTypesInput!) {
    deliveryTypes(input: $input) {
      deliveryTypes {
        ...DeliveryTypeFragment
      }
    }
  }
`;

export const GET_DELIVERY_TYPE = gql`
  ${DELIVERY_TYPE_FRAGMENT}
  query GetDeliveryType($input: DeliveryTypeInput!) {
    deliveryType(input: $input) {
      deliveryType {
        ...DeliveryTypeFragment
      }
    }
  }
`;