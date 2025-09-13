'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useQuery, useMutation } from '@apollo/client/react';
import { useSearchParams } from 'next/navigation';
import {
  Building2,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Globe,
  Map,
  MapPin,
  Filter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// TODO: Replace with GraphQL when backend is ready
// import {
//   GET_COUNTRIES,
//   GET_STATES,
//   GET_CITIES,
// } from '@/lib/graphql/queries/locations';
// import { DELETE_CITY } from '@/lib/graphql/mutations/locations';
import { 
  useCountriesQuery, 
  useStatesQuery, 
  useCitiesQuery,
   
} from "@/lib/graphql/generated";
import Link from 'next/link';

export default function CitiesPage() {
  const searchParams = useSearchParams();
  const preselectedStateId = searchParams.get('stateId');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState(
    preselectedStateId || ''
  );

  // TODO: Replace with GraphQL when backend is ready
  const { data: countriesData } = useCountriesQuery({
    variables: { input: { _: null } },
  });

  // TODO: Replace with GraphQL when backend is ready
  const { data: statesData } = useStatesQuery();

  // TODO: Replace with GraphQL when backend is ready
  const { data: citiesData, loading, error, refetch } = useCitiesQuery();

  // TODO: Replace with GraphQL when backend is ready
  // TODO: Add proper mutation

  const handleDelete = async (cityId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta ciudad?')) {
      // TODO: Replace with real mutation when backend is ready
      await deleteCity();
    }
  };

  const countries = countriesData?.countries?.countries || [];
  const states = statesData?.states?.states || [];
  const cities = citiesData?.cities?.cities || [];

  const selectedCountry = countries.find(
    (c: any) => c.id === selectedCountryId
  );
  const selectedState = states.find((s: any) => s.id === selectedStateId);

  const filteredCities = cities.filter((city: any) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-select country if state is preselected
  useState(() => {
    if (preselectedStateId && statesData) {
      // This would require the state to have country info, simplified for now
    }
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/locations">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ubicaciones
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión de Ciudades
            </h1>
            <p className="text-muted-foreground">
              {selectedState
                ? `Administra ciudades de ${selectedState.name}`
                : 'Administra ciudades por estado/provincia'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          {selectedStateId && (
            <Button asChild>
              <Link
                href={`/dashboard/locations/cities/create?stateId=${selectedStateId}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Ciudad
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedCountry && selectedState && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>{selectedCountry.name}</span>
          <span>/</span>
          <Map className="h-4 w-4" />
          <span>{selectedState.name}</span>
          <span>/</span>
          <Building2 className="h-4 w-4" />
          <span>Ciudades</span>
        </div>
      )}

      {/* Statistics */}
      {selectedStateId && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Ciudades
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cities.length}</div>
              <p className="text-xs text-muted-foreground">
                En {selectedState?.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Códigos Postales
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cities.reduce(
                  (total: number, city: any) =>
                    total + (city.zipCodes?.length || 0),
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de códigos postales
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Con Servicio
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                Ciudades con cobertura
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nuevas Este Mes
              </CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Agregadas recientemente
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Select
                value={selectedCountryId}
                onValueChange={setSelectedCountryId}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country: any) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={selectedStateId}
                onValueChange={setSelectedStateId}
                disabled={!selectedCountryId}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar estado/provincia" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state: any) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ciudades por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  disabled={!selectedStateId}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ciudades</CardTitle>
          <CardDescription>
            {!selectedStateId
              ? 'Selecciona un estado/provincia para ver sus ciudades'
              : loading
                ? 'Cargando ciudades...'
                : `${filteredCities.length} ciudades encontradas`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedStateId ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Selecciona un estado/provincia
              </h3>
              <p className="text-muted-foreground">
                Elige un país y estado/provincia para ver sus ciudades.
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredCities.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {searchTerm ? 'No se encontraron ciudades' : 'No hay ciudades'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'Ajusta los términos de búsqueda.'
                  : `No hay ciudades configuradas para ${selectedState?.name}.`}
              </p>
              {!searchTerm && (
                <Button asChild className="mt-4">
                  <Link
                    href={`/dashboard/locations/cities/create?stateId=${selectedStateId}`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Ciudad
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ciudad</TableHead>
                    <TableHead>Estado/Provincia</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Códigos Postales</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCities.map((city: any) => (
                    <TableRow key={city.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{city.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Map className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{selectedState?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {city.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {city.zipCodes?.slice(0, 3).map((zip: string) => (
                            <Badge
                              key={zip}
                              variant="outline"
                              className="text-xs"
                            >
                              {zip}
                            </Badge>
                          ))}
                          {city.zipCodes?.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{city.zipCodes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Activa
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/locations/cities/${city.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/locations/cities/${city.id}/edit`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(city.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
