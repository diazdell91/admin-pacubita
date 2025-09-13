'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Map,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Globe,
  Building2,
  Filter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useCountriesQuery, useStatesQuery, useProvincesQuery } from "@/lib/graphql/generated";
import Link from 'next/link';

export default function StatesPage() {
  const searchParams = useSearchParams();
  const preselectedCountryId = searchParams.get('countryId');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState(
    preselectedCountryId || ''
  );
  const [activeTab, setActiveTab] = useState<'states' | 'provinces'>('states');

  const { data: countriesData } = useCountriesQuery({
    variables: { input: { _: null } },
  });

  const {
    data: statesData,
    loading: statesLoading,
    error: statesError,
    refetch: refetchStates,
  } = useStatesQuery({
    variables: {
      input: { countryId: selectedCountryId || undefined },
    },
    skip: !selectedCountryId,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: provincesData,
    loading: provincesLoading,
    error: provincesError,
    refetch: refetchProvinces,
  } = useProvincesQuery({
    variables: {
      input: { countryId: selectedCountryId || undefined },
    },
    skip: !selectedCountryId,
    fetchPolicy: 'cache-and-network',
  });

  // TODO: Implement delete functionality when backend is ready
  // const [deleteState] = useDeleteStateMutation({
  //   onCompleted: () => {
  //     refetch();
  //   },
  // });

  const handleDelete = async (id: string, type: 'state' | 'province') => {
    // TODO: Replace with actual delete mutation when backend is ready
    console.log(`Delete ${type} functionality not yet implemented:`, id);
    alert(`Funcionalidad de eliminación de ${type === 'state' ? 'estado' : 'provincia'} no implementada aún.`);
  };

  const countries = countriesData?.countries?.countries || [];
  const states = statesData?.states?.states || [];
  const provinces = provincesData?.provinces?.provinces || [];
  const selectedCountry = countries.find(
    (c: any) => c.id === selectedCountryId
  );

  const currentData = activeTab === 'states' ? states : provinces;
  const currentLoading = activeTab === 'states' ? statesLoading : provincesLoading;
  const currentError = activeTab === 'states' ? statesError : provincesError;

  const filteredData = currentData.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentError) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error al cargar {activeTab === 'states' ? 'estados' : 'provincias'}
          </h1>
          <p className="text-muted-foreground">{currentError.message}</p>
          <Button onClick={() => activeTab === 'states' ? refetchStates() : refetchProvinces()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

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
              Estados y Provincias
            </h1>
            <p className="text-muted-foreground">
              {selectedCountry
                ? `Administra estados y provincias de ${selectedCountry.name}`
                : 'Administra estados y provincias por país'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          {selectedCountryId && (
            <Button asChild>
              <Link
                href={`/dashboard/locations/states/create?countryId=${selectedCountryId}&type=${activeTab.slice(0, -1)}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo {activeTab === 'states' ? 'Estado' : 'Provincia'}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedCountry && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>{selectedCountry.name}</span>
          <span>/</span>
          <Map className="h-4 w-4" />
          <span>Estados y Provincias</span>
        </div>
      )}

      {/* Tabs for States and Provinces */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'states' | 'provinces')} className="space-y-6">
        <TabsList>
          <TabsTrigger value="states">Estados</TabsTrigger>
          <TabsTrigger value="provinces">Provincias</TabsTrigger>
        </TabsList>

        <TabsContent value="states" className="space-y-6">
          {/* Statistics for States */}
          {selectedCountryId && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Estados
              </CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{states.length}</div>
              <p className="text-xs text-muted-foreground">
                En {selectedCountry?.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ciudades</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total de ciudades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Con Cobertura
              </CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((states.length / Math.max(states.length, 1)) * 100)}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Estados con servicio activo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nuevos Este Mes
              </CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Agregados recientemente
              </p>
            </CardContent>
          </Card>
        </div>
          )}

          {/* Filters for States */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Select
                value={selectedCountryId}
                onValueChange={setSelectedCountryId}
              >
                <SelectTrigger className="w-64">
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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estados/provincias por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  disabled={!selectedCountryId}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* States Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estados</CardTitle>
          <CardDescription>
            {!selectedCountryId
              ? 'Selecciona un país para ver sus estados'
              : statesLoading
                ? 'Cargando estados...'
                : `${states.filter((state: any) => state.name.toLowerCase().includes(searchTerm.toLowerCase())).length} estados encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedCountryId ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Selecciona un país</h3>
              <p className="text-muted-foreground">
                Elige un país del filtro superior para ver sus estados.
              </p>
            </div>
          ) : statesLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : states.filter((state: any) => state.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
            <div className="text-center py-12">
              <Map className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {searchTerm
                  ? 'No se encontraron estados'
                  : 'No hay estados'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'Ajusta los términos de búsqueda.'
                  : `No hay estados configurados para ${selectedCountry?.name}.`}
              </p>
              {!searchTerm && (
                <Button asChild className="mt-4">
                  <Link
                    href={`/dashboard/locations/states/create?countryId=${selectedCountryId}&type=state`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Estado
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Ciudades</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {states.filter((state: any) => state.name.toLowerCase().includes(searchTerm.toLowerCase())).map((state: any) => (
                    <TableRow key={state.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Map className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{state.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {selectedCountry?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {state.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ver Ciudades</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Activo
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
                                href={`/dashboard/locations/cities?stateId=${state.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Ciudades
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/locations/states/${state.id}/edit`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(state.id, 'state')}
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
        </TabsContent>

        <TabsContent value="provinces" className="space-y-6">
          {/* Statistics for Provinces */}
          {selectedCountryId && (
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Provincias
                  </CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{provinces.length}</div>
                  <p className="text-xs text-muted-foreground">
                    En {selectedCountry?.name}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ciudades</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Total de ciudades</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Con Cobertura
                  </CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((provinces.length / Math.max(provinces.length, 1)) * 100)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Provincias con servicio activo
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

          {/* Filters for Provinces */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <Select
                    value={selectedCountryId}
                    onValueChange={setSelectedCountryId}
                  >
                    <SelectTrigger className="w-64">
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
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar provincias por nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                      disabled={!selectedCountryId}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provinces Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Provincias</CardTitle>
              <CardDescription>
                {!selectedCountryId
                  ? 'Selecciona un país para ver sus provincias'
                  : provincesLoading
                    ? 'Cargando provincias...'
                    : `${provinces.filter((province: any) => province.name.toLowerCase().includes(searchTerm.toLowerCase())).length} provincias encontradas`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedCountryId ? (
                <div className="text-center py-12">
                  <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Selecciona un país</h3>
                  <p className="text-muted-foreground">
                    Elige un país del filtro superior para ver sus provincias.
                  </p>
                </div>
              ) : provincesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : provinces.filter((province: any) => province.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <div className="text-center py-12">
                  <Map className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    {searchTerm
                      ? 'No se encontraron provincias'
                      : 'No hay provincias'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? 'Ajusta los términos de búsqueda.'
                      : `No hay provincias configuradas para ${selectedCountry?.name}.`}
                  </p>
                  {!searchTerm && (
                    <Button asChild className="mt-4">
                      <Link
                        href={`/dashboard/locations/states/create?countryId=${selectedCountryId}&type=province`}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Provincia
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provincia</TableHead>
                        <TableHead>País</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Ciudades</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {provinces.filter((province: any) => province.name.toLowerCase().includes(searchTerm.toLowerCase())).map((province: any) => (
                        <TableRow key={province.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Map className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{province.name}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {selectedCountry?.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {province.id}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Ver Ciudades</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-800"
                            >
                              Activo
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
                                    href={`/dashboard/locations/cities?provinceId=${province.id}`}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver Ciudades
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/locations/states/${province.id}/edit`}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDelete(province.id, 'province')}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
