'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Home,
  Plus,
  Search,
  ArrowLeft,
  MapPin,
  Building2,
  Filter,
  Map,
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
import { useMunicipalitiesQuery, useNeighborhoodsQuery } from '@/lib/graphql/generated';
import Link from 'next/link';

export default function NeighborhoodsPage() {
  const searchParams = useSearchParams();
  const preselectedMunicipalityId = searchParams.get('municipalityId');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(
    preselectedMunicipalityId || ''
  );

  const { data: municipalitiesData } = useMunicipalitiesQuery({
    variables: { input: { provinceId: '' } }, // We'll need to adjust this based on your needs
  });

  const { data: neighborhoodsData, loading, error, refetch } = useNeighborhoodsQuery({
    variables: { input: { municipalityId: selectedMunicipalityId || '' } },
    skip: !selectedMunicipalityId,
  });

  const municipalities = municipalitiesData?.municipalities?.municipalities || [];
  const neighborhoods = neighborhoodsData?.neighborhoods?.neighborhoods || [];
  const selectedMunicipality = municipalities.find(
    (m: any) => m.id === selectedMunicipalityId
  );

  const filteredNeighborhoods = neighborhoods.filter((neighborhood: any) =>
    neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              Gestión de Barrios
            </h1>
            <p className="text-muted-foreground">
              {selectedMunicipality
                ? `Administra barrios de ${selectedMunicipality.name}`
                : 'Administra barrios por municipio'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {selectedMunicipalityId && (
            <Button asChild>
              <Link
                href={`/dashboard/locations/neighborhoods/create?municipalityId=${selectedMunicipalityId}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Barrio
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      {selectedMunicipalityId && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Barrios
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{neighborhoods.length}</div>
              <p className="text-xs text-muted-foreground">
                En {selectedMunicipality?.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Direcciones</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,845</div>
              <p className="text-xs text-muted-foreground">
                Total de direcciones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Con Cobertura
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                Barrios con servicio
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
              <div className="text-2xl font-bold">5</div>
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
                value={selectedMunicipalityId}
                onValueChange={setSelectedMunicipalityId}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar municipio" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality: any) => (
                    <SelectItem key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar barrios por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                  disabled={!selectedMunicipalityId}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Neighborhoods Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Barrios</CardTitle>
          <CardDescription>
            {!selectedMunicipalityId
              ? 'Selecciona un municipio para ver sus barrios'
              : loading
                ? 'Cargando barrios...'
                : `${filteredNeighborhoods.length} barrios encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedMunicipalityId ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Selecciona un municipio
              </h3>
              <p className="text-muted-foreground">
                Elige un municipio para ver sus barrios.
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredNeighborhoods.length === 0 ? (
            <div className="text-center py-12">
              <Home className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No hay barrios</h3>
              <p className="text-muted-foreground">
                No hay barrios configurados para {selectedMunicipality?.name}.
              </p>
              <Button asChild className="mt-4">
                <Link
                  href={`/dashboard/locations/neighborhoods/create?municipalityId=${selectedMunicipalityId}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Barrio
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barrio</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Direcciones</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNeighborhoods.map((neighborhood: any) => (
                    <TableRow key={neighborhood.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <div className="font-medium">{neighborhood.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{selectedMunicipality?.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {neighborhood.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ver Direcciones</Badge>
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
                        <Button variant="ghost" size="sm">
                          Ver Detalles
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
