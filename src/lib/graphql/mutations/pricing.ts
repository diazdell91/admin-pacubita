import { gql } from '@apollo/client';

export const CREATE_ARTICLE_PRICING_RULE = gql`
  mutation CreateArticlePricingRule($input: CreateArticlePricingRuleInput!) {
    createArticlePricingRule(input: $input) {
      articlePricingRule {
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
        article {
          id
          name
        }
        articleVariant {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_ARTICLE_PRICING_RULE = gql`
  mutation UpdateArticlePricingRule($input: UpdateArticlePricingRuleInput!) {
    updateArticlePricingRule(input: $input) {
      articlePricingRule {
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
        article {
          id
          name
        }
        articleVariant {
          id
          name
        }
      }
    }
  }
`;