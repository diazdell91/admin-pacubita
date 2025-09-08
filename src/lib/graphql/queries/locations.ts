import { gql } from '@apollo/client';
import {
  COUNTRY_FRAGMENT,
  STATE_FRAGMENT,
  CITY_FRAGMENT,
  PROVINCE_FRAGMENT,
  MUNICIPALITY_FRAGMENT,
  NEIGHBORHOOD_FRAGMENT
} from '../fragments';

// Countries
export const GET_COUNTRIES = gql`
  ${COUNTRY_FRAGMENT}
  query GetCountries($input: CountriesInput!) {
    countries(input: $input) {
      countries {
        ...CountryFragment
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  ${COUNTRY_FRAGMENT}
  query GetCountry($input: CountryInput!) {
    country(input: $input) {
      country {
        ...CountryFragment
      }
    }
  }
`;

// States
export const GET_STATES = gql`
  ${STATE_FRAGMENT}
  query GetStates($input: StatesInput!) {
    states(input: $input) {
      states {
        ...StateFragment
      }
    }
  }
`;

export const GET_STATE = gql`
  ${STATE_FRAGMENT}
  query GetState($input: StateInput!) {
    state(input: $input) {
      state {
        ...StateFragment
      }
    }
  }
`;

// Cities
export const GET_CITIES = gql`
  ${CITY_FRAGMENT}
  query GetCities($input: CitiesInput!) {
    cities(input: $input) {
      cities {
        ...CityFragment
      }
    }
  }
`;

export const GET_CITY = gql`
  ${CITY_FRAGMENT}
  query GetCity($input: CityInput!) {
    city(input: $input) {
      city {
        ...CityFragment
      }
    }
  }
`;

// Provinces
export const GET_PROVINCES = gql`
  ${PROVINCE_FRAGMENT}
  query GetProvinces($input: ProvincesInput!) {
    provinces(input: $input) {
      provinces {
        ...ProvinceFragment
      }
    }
  }
`;

export const GET_PROVINCE = gql`
  ${PROVINCE_FRAGMENT}
  query GetProvince($input: ProvinceInput!) {
    province(input: $input) {
      province {
        ...ProvinceFragment
      }
    }
  }
`;

// Municipalities
export const GET_MUNICIPALITIES = gql`
  ${MUNICIPALITY_FRAGMENT}
  query GetMunicipalities($input: MunicipalitiesInput!) {
    municipalities(input: $input) {
      municipalities {
        ...MunicipalityFragment
      }
    }
  }
`;

export const GET_MUNICIPALITY = gql`
  ${MUNICIPALITY_FRAGMENT}
  query GetMunicipality($input: MunicipalityInput!) {
    municipality(input: $input) {
      municipality {
        ...MunicipalityFragment
      }
    }
  }
`;

// Neighborhoods
export const GET_NEIGHBORHOODS = gql`
  ${NEIGHBORHOOD_FRAGMENT}
  query GetNeighborhoods($input: NeighborhoodsInput!) {
    neighborhoods(input: $input) {
      neighborhoods {
        ...NeighborhoodFragment
      }
    }
  }
`;

export const GET_NEIGHBORHOOD = gql`
  ${NEIGHBORHOOD_FRAGMENT}
  query GetNeighborhood($input: NeighborhoodInput!) {
    neighborhood(input: $input) {
      neighborhood {
        ...NeighborhoodFragment
      }
    }
  }
`;