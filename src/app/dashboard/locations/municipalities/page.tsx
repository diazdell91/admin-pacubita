'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Plus,
  Search,
  ArrowLeft,
  Building2,
  Filter,
  Home,
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
import { useProvincesQuery, useMunicipalitiesQuery } from '@/lib/graphql/generated';
import Link from 'next/link';

export default function MunicipalitiesPage() {
  const searchParams = useSearchParams();
  const preselectedProvinceId = searchParams.get('provinceId');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState(
    preselectedProvinceId || ''
  );

  const { data: provincesData } = useProvincesQuery({
    variables: { input: { countryId: 'cuba-id' } }, // Assuming Cuba for now
  });

  const { data: municipalitiesData, loading, error, refetch } = useMunicipalitiesQuery({
    variables: { input: { provinceId: selectedProvinceId || '' } },
    skip: !selectedProvinceId,
  });

  const provinces = provincesData?.provinces?.provinces || [];
  const municipalities = municipalitiesData?.municipalities?.municipalities || [];
  const selectedProvince = provinces.find(
    (p: any) => p.id === selectedProvinceId
  );

  const filteredMunicipalities = municipalities.filter((municipality: any) =>
    municipality.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Gestión de Municipios
            </h1>
            <p className="text-muted-foreground">
              {selectedProvince
                ? `Administra municipios de ${selectedProvince.name}`
                : 'Administra municipios por provincia'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {selectedProvinceId && (
            <Button asChild>
              <Link
                href={`/dashboard/locations/municipalities/create?provinceId=${selectedProvinceId}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Municipio
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      {selectedProvinceId && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Municipios
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{municipalities.length}</div>
              <p className="text-xs text-muted-foreground">
                En {selectedProvince?.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Barrios</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">Total de barrios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Con Cobertura
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                Municipios con servicio
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
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Agregados recientemente
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
                value={selectedProvinceId}
                onValueChange={setSelectedProvinceId}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province: any) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar municipios por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  disabled={!selectedProvinceId}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Municipalities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Municipios</CardTitle>
          <CardDescription>
            {!selectedProvinceId
              ? 'Selecciona una provincia para ver sus municipios'
              : loading
                ? 'Cargando municipios...'
                : `${filteredMunicipalities.length} municipios encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedProvinceId ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Selecciona una provincia
              </h3>
              <p className="text-muted-foreground">
                Elige una provincia para ver sus municipios.
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredMunicipalities.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No hay municipios</h3>
              <p className="text-muted-foreground">
                No hay municipios configurados para {selectedProvince?.name}.
              </p>
              <Button asChild className="mt-4">
                <Link
                  href={`/dashboard/locations/municipalities/create?provinceId=${selectedProvinceId}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Municipio
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Provincia</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Barrios</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMunicipalities.map((municipality: any) => (
                    <TableRow key={municipality.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="font-medium">{municipality.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{selectedProvince?.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {municipality.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ver Barrios</Badge>
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
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/dashboard/locations/neighborhoods?municipalityId=${municipality.id}`}
                          >
                            Ver Barrios
                          </Link>
                        </Button>
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
