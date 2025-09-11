'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useQuery } from '@apollo/client/react';
import {
  MapPin,
  Globe,
  Map,
  Building2,
  Home,
  Plus,
  Search,
  ChevronRight,
  BarChart3,
  Download,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// TODO: Replace with GraphQL when backend is ready
// import { GET_COUNTRIES } from '@/lib/graphql/queries/locations';
import { useMockCountriesQuery } from '@/lib/mock-data';
import {
  LocationTree,
  generateSampleLocationTree,
} from '@/app/dashboard/locations/components/LocationTree';
import Link from 'next/link';

const LOCATION_HIERARCHY = [
  {
    level: 'countries',
    title: 'Países',
    icon: Globe,
    description: 'Gestiona los países disponibles',
    color: 'text-blue-600 bg-blue-100',
    route: '/dashboard/locations/countries',
  },
  {
    level: 'states',
    title: 'Estados/Provincias',
    icon: Map,
    description: 'Estados y provincias por país',
    color: 'text-green-600 bg-green-100',
    route: '/dashboard/locations/states',
  },
  {
    level: 'cities',
    title: 'Ciudades',
    icon: Building2,
    description: 'Ciudades por estado/provincia',
    color: 'text-purple-600 bg-purple-100',
    route: '/dashboard/locations/cities',
  },
  {
    level: 'municipalities',
    title: 'Municipios',
    icon: MapPin,
    description: 'Municipios por provincia',
    color: 'text-orange-600 bg-orange-100',
    route: '/dashboard/locations/municipalities',
  },
  {
    level: 'neighborhoods',
    title: 'Barrios',
    icon: Home,
    description: 'Barrios por municipio',
    color: 'text-red-600 bg-red-100',
    route: '/dashboard/locations/neighborhoods',
  },
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with GraphQL when backend is ready
  const { data: countriesData, loading: countriesLoading } = useMockCountriesQuery();

  const countries = countriesData?.countries?.data || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Ubicaciones
          </h1>
          <p className="text-muted-foreground">
            Administra la estructura geográfica del sistema de entregas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Estadísticas
          </Button>
        </div>
      </div>

      {/* Location Hierarchy Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        {LOCATION_HIERARCHY.map((level, index) => {
          const Icon = level.icon;

          return (
            <Card key={level.level} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full ${level.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {index < LOCATION_HIERARCHY.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground absolute -right-2 top-1/2 transform -translate-y-1/2 bg-background" />
                  )}
                </div>
                <CardTitle className="text-lg">{level.title}</CardTitle>
                <CardDescription className="text-xs">
                  {level.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">
                    {level.level === 'countries' ? countries.length : '-'}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href={level.route}>Ver {level.title}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Países
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.length}</div>
            <p className="text-xs text-muted-foreground">
              Países disponibles para entrega
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cobertura Total
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              Cobertura geográfica disponible
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zonas Activas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Ubicaciones con servicio activo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nuevas Esta Semana
            </CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Nuevas ubicaciones agregadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Location Management Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Location Hierarchy Tree */}
        <Card>
          <CardHeader>
            <CardTitle>Jerarquía de Ubicaciones</CardTitle>
            <CardDescription>
              Vista en árbol de la estructura geográfica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LocationTree
              data={generateSampleLocationTree()}
              className="max-h-96 overflow-y-auto"
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona ubicaciones de manera eficiente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {LOCATION_HIERARCHY.map((level) => {
              const Icon = level.icon;

              return (
                <div
                  key={level.level}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${level.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{level.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {level.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={level.route}>Ver</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`${level.route}/create`}>
                        <Plus className="h-3 w-3 mr-1" />
                        Crear
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Países Disponibles</CardTitle>
            <CardDescription>
              Lista de países con cobertura de entrega
            </CardDescription>
          </CardHeader>
          <CardContent>
            {countriesLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : countries.length === 0 ? (
              <div className="text-center py-8">
                <Globe className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">
                  No hay países configurados
                </p>
                <Button size="sm" asChild>
                  <Link href="/dashboard/locations/countries/create">
                    <Plus className="h-3 w-3 mr-1" />
                    Agregar País
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {countries.slice(0, 5).map((country: any) => (
                  <div
                    key={country.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {country.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/dashboard/locations/states?countryId=${country.id}`}
                        >
                          Ver Estados
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}

                {countries.length > 5 && (
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/locations/countries">
                        Ver todos los países ({countries.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Location Tree Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Estructura Jerárquica</CardTitle>
          <CardDescription>
            Visualización de la jerarquía de ubicaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Estructura de Ubicaciones:
            </div>

            <div className="pl-4 border-l-2 border-muted space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="font-medium">País</span>
                <Badge variant="outline" className="text-xs">
                  Ej: Cuba
                </Badge>
              </div>

              <div className="pl-6 border-l-2 border-muted space-y-2">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Estado/Provincia</span>
                  <Badge variant="outline" className="text-xs">
                    Ej: La Habana
                  </Badge>
                </div>

                <div className="pl-6 border-l-2 border-muted space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Ciudad</span>
                    <Badge variant="outline" className="text-xs">
                      Ej: Habana
                    </Badge>
                  </div>

                  <div className="pl-6 border-l-2 border-muted space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">Municipio</span>
                      <Badge variant="outline" className="text-xs">
                        Ej: Plaza
                      </Badge>
                    </div>

                    <div className="pl-6">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Barrio</span>
                        <Badge variant="outline" className="text-xs">
                          Ej: Vedado
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
