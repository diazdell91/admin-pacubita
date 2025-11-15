'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';
import { graphql } from '@/generated';
import type {
  CountriesQuery,
  StatesQuery,
  CitiesQuery,
  ProvincesQuery,
  MunicipalitiesQuery,
  NeighborhoodsQuery,
} from '@/generated/graphql';

interface LocationSelectorProps {
  value?: {
    countryId?: string;
    stateId?: string;
    cityId?: string;
    provinceId?: string;
    municipalityId?: string;
    neighborhoodId?: string;
  };
  onChange: (location: {
    countryId?: string;
    stateId?: string;
    cityId?: string;
    provinceId?: string;
    municipalityId?: string;
    neighborhoodId?: string;
  }) => void;
  levels?: Array<
    'country' | 'state' | 'city' | 'province' | 'municipality' | 'neighborhood'
  >;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_LEVELS: Array<
  'country' | 'state' | 'city' | 'province' | 'municipality' | 'neighborhood'
> = ['country', 'state', 'city', 'province', 'municipality', 'neighborhood'];

const LEVEL_LABELS = {
  country: 'País',
  state: 'Estado/Provincia',
  city: 'Ciudad',
  province: 'Provincia',
  municipality: 'Municipio',
  neighborhood: 'Barrio',
};

export function LocationSelector({
  value = {},
  onChange,
  levels = DEFAULT_LEVELS,
  required = false,
  disabled = false,
  className,
}: LocationSelectorProps) {
  const [selections, setSelections] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setSelections(value);
  }, [value]);

  // Countries query
  const { data: countriesData, loading: countriesLoading } = useQuery(
    graphql(`
      query GetCountries($input: CountriesInput!) {
        countries(input: $input) {
          countries {
            ...CountryFragment
          }
        }
      }
    `),
    {
      variables: { input: {} },
      skip: !levels.includes('country'),
    }
  );

  // States query
  const { data: statesData, loading: statesLoading } = useQuery(
    graphql(`
      query GetStates($input: StatesInput!) {
        states(input: $input) {
          states {
            ...StateFragment
          }
        }
      }
    `),
    {
      variables: { input: { countryId: selections.countryId } },
      skip: !levels.includes('state') || !selections.countryId,
    }
  );

  // Cities query
  const { data: citiesData, loading: citiesLoading } = useQuery(
    graphql(`
      query GetCities($input: CitiesInput!) {
        cities(input: $input) {
          cities {
            ...CityFragment
          }
        }
      }
    `),
    {
      variables: { input: { stateId: selections.stateId } },
      skip: !levels.includes('city') || !selections.stateId,
    }
  );

  // Provinces query
  const { data: provincesData, loading: provincesLoading } = useQuery(
    graphql(`
      query GetProvinces($input: ProvincesInput!) {
        provinces(input: $input) {
          provinces {
            ...ProvinceFragment
          }
        }
      }
    `),
    {
      variables: { input: { countryId: selections.countryId } },
      skip: !levels.includes('province') || !selections.countryId,
    }
  );

  // Municipalities query
  const { data: municipalitiesData, loading: municipalitiesLoading } = useQuery(
    graphql(`
      query GetMunicipalities($input: MunicipalitiesInput!) {
        municipalities(input: $input) {
          municipalities {
            ...MunicipalityFragment
          }
        }
      }
    `),
    {
      variables: { input: { provinceId: selections.provinceId } },
      skip: !levels.includes('municipality') || !selections.provinceId,
    }
  );

  // Neighborhoods query
  const { data: neighborhoodsData, loading: neighborhoodsLoading } = useQuery(
    graphql(`
      query GetNeighborhoods($input: NeighborhoodsInput!) {
        neighborhoods(input: $input) {
          neighborhoods {
            ...NeighborhoodFragment
          }
        }
      }
    `),
    {
      variables: { input: { municipalityId: selections.municipalityId } },
      skip: !levels.includes('neighborhood') || !selections.municipalityId,
    }
  );

  const countries = countriesData?.countries?.countries || [];
  const states = statesData?.states?.states || [];
  const cities = citiesData?.cities?.cities || [];
  const provinces = provincesData?.provinces?.provinces || [];
  const municipalities =
    municipalitiesData?.municipalities?.municipalities || [];
  const neighborhoods = neighborhoodsData?.neighborhoods?.neighborhoods || [];

  const handleSelectionChange = (level: string, selectedId: string) => {
    const newSelections = { ...selections };

    // Clear dependent selections when a parent changes
    switch (level) {
      case 'country':
        newSelections.countryId = selectedId;
        delete newSelections.stateId;
        delete newSelections.cityId;
        delete newSelections.provinceId;
        delete newSelections.municipalityId;
        delete newSelections.neighborhoodId;
        break;
      case 'state':
        newSelections.stateId = selectedId;
        delete newSelections.cityId;
        delete newSelections.municipalityId;
        delete newSelections.neighborhoodId;
        break;
      case 'city':
        newSelections.cityId = selectedId;
        break;
      case 'province':
        newSelections.provinceId = selectedId;
        delete newSelections.municipalityId;
        delete newSelections.neighborhoodId;
        break;
      case 'municipality':
        newSelections.municipalityId = selectedId;
        delete newSelections.neighborhoodId;
        break;
      case 'neighborhood':
        newSelections.neighborhoodId = selectedId;
        break;
    }

    setSelections(newSelections);
    onChange(newSelections);
  };

  const renderSelect = (
    level:
      | 'country'
      | 'state'
      | 'city'
      | 'province'
      | 'municipality'
      | 'neighborhood',
    options: any[],
    loading: boolean,
    selectedValue?: string,
    dependsOn?: string
  ) => {
    const isDisabled =
      disabled ||
      loading ||
      (dependsOn && !selections[dependsOn as keyof typeof selections]);

    return (
      <div key={level} className="space-y-2">
        <Label htmlFor={level} className="text-sm font-medium">
          {LEVEL_LABELS[level]}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        <Select
          value={selectedValue || ''}
          onValueChange={(value) => handleSelectionChange(level, value)}
          disabled={isDisabled || false}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                loading
                  ? `Cargando ${LEVEL_LABELS[level].toLowerCase()}...`
                  : `Seleccionar ${LEVEL_LABELS[level].toLowerCase()}`
              }
            />
            {loading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
          </SelectTrigger>

          <SelectContent>
            {options.length === 0 && !loading ? (
              <SelectItem value="no-options" disabled>
                No hay opciones disponibles
              </SelectItem>
            ) : (
              options.map((option: any) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {option.name}
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2">
        {levels.includes('country') &&
          renderSelect(
            'country',
            countries,
            countriesLoading,
            selections.countryId
          )}

        {levels.includes('state') &&
          renderSelect(
            'state',
            states,
            statesLoading,
            selections.stateId,
            'countryId'
          )}

        {levels.includes('city') &&
          renderSelect(
            'city',
            cities,
            citiesLoading,
            selections.cityId,
            'stateId'
          )}

        {levels.includes('province') &&
          renderSelect(
            'province',
            provinces,
            provincesLoading,
            selections.provinceId,
            'countryId'
          )}

        {levels.includes('municipality') &&
          renderSelect(
            'municipality',
            municipalities,
            municipalitiesLoading,
            selections.municipalityId,
            'provinceId'
          )}

        {levels.includes('neighborhood') &&
          renderSelect(
            'neighborhood',
            neighborhoods,
            neighborhoodsLoading,
            selections.neighborhoodId,
            'municipalityId'
          )}
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <strong>Debug:</strong> {JSON.stringify(selections, null, 2)}
        </div>
      )}
    </div>
  );
}
