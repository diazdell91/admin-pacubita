import { gql } from '@apollo/client';
import {
  STATE_FRAGMENT,
  CITY_FRAGMENT,
  PROVINCE_FRAGMENT,
  MUNICIPALITY_FRAGMENT,
  NEIGHBORHOOD_FRAGMENT
} from '../fragments';

// State mutations
export const CREATE_STATE = gql`
  ${STATE_FRAGMENT}
  mutation CreateState($input: CreateStateInput!) {
    createState(input: $input) {
      state {
        ...StateFragment
      }
    }
  }
`;

export const UPDATE_STATE = gql`
  ${STATE_FRAGMENT}
  mutation UpdateState($input: UpdateStateInput!) {
    updateState(input: $input) {
      state {
        ...StateFragment
      }
    }
  }
`;

// City mutations
export const CREATE_CITY = gql`
  ${CITY_FRAGMENT}
  mutation CreateCity($input: CreateCityInput!) {
    createCity(input: $input) {
      city {
        ...CityFragment
      }
    }
  }
`;

export const UPDATE_CITY = gql`
  ${CITY_FRAGMENT}
  mutation UpdateCity($input: UpdateCityInput!) {
    updateCity(input: $input) {
      city {
        ...CityFragment
      }
    }
  }
`;

// Province mutations
export const CREATE_PROVINCE = gql`
  ${PROVINCE_FRAGMENT}
  mutation CreateProvince($input: CreateProvinceInput!) {
    createProvince(input: $input) {
      province {
        ...ProvinceFragment
      }
    }
  }
`;

export const UPDATE_PROVINCE = gql`
  ${PROVINCE_FRAGMENT}
  mutation UpdateProvince($input: UpdateProvinceInput!) {
    updateProvince(input: $input) {
      province {
        ...ProvinceFragment
      }
    }
  }
`;

// Municipality mutations
export const CREATE_MUNICIPALITY = gql`
  ${MUNICIPALITY_FRAGMENT}
  mutation CreateMunicipality($input: CreateMunicipalityInput!) {
    createMunicipality(input: $input) {
      municipality {
        ...MunicipalityFragment
      }
    }
  }
`;

export const UPDATE_MUNICIPALITY = gql`
  ${MUNICIPALITY_FRAGMENT}
  mutation UpdateMunicipality($input: UpdateMunicipalityInput!) {
    updateMunicipality(input: $input) {
      municipality {
        ...MunicipalityFragment
      }
    }
  }
`;

// Neighborhood mutations
export const CREATE_NEIGHBORHOOD = gql`
  ${NEIGHBORHOOD_FRAGMENT}
  mutation CreateNeighborhood($input: CreateNeighborhoodInput!) {
    createNeighborhood(input: $input) {
      neighborhood {
        ...NeighborhoodFragment
      }
    }
  }
`;

export const UPDATE_NEIGHBORHOOD = gql`
  ${NEIGHBORHOOD_FRAGMENT}
  mutation UpdateNeighborhood($input: UpdateNeighborhoodInput!) {
    updateNeighborhood(input: $input) {
      neighborhood {
        ...NeighborhoodFragment
      }
    }
  }
`;