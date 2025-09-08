import { gql } from '@apollo/client';
import { PRICING_RULE_FRAGMENT } from '../fragments';

export const GET_PRICING_RULES = gql`
  ${PRICING_RULE_FRAGMENT}
  query GetPricingRules($input: PricingRulesInput!) {
    pricingRules(input: $input) {
      pricingRules {
        ...PricingRuleFragment
        ... on ArticlePricingRule {
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
  }
`;

export const GET_PRICING_RULE = gql`
  ${PRICING_RULE_FRAGMENT}
  query GetPricingRule($input: PricingRuleInput!) {
    pricingRule(input: $input) {
      pricingRule {
        ...PricingRuleFragment
        ... on ArticlePricingRule {
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
  }
`;