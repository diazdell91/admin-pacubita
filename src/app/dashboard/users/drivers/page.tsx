'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  Truck,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Phone,
  ArrowLeft,
  Car,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// TODO: Add proper user queries to generated file - import { GET_USERS }
import Link from 'next/link';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'enabled', label: 'Activos' },
  { value: 'disabled', label: 'Desactivados' },
];

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: {
      input: {
        type: 'DRIVER',
        isEnabled:
          statusFilter === 'enabled'
            ? true
            : statusFilter === 'disabled'
              ? false
              : undefined,
        search: searchTerm || undefined,
        pagination: {
          page: currentPage,
          limit: pageSize,
        },
        sorting: {
          field: 'createdAt',
          order: -1,
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-CU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error al cargar conductores
          </h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const drivers = data?.users?.users || [];
  const total = data?.users?.total || 0;
  const activeDrivers = drivers.filter(
    (driver: any) => driver.isEnabled
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Todos los Usuarios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión de Conductores
            </h1>
            <p className="text-muted-foreground">
              Administra todos los conductores del sistema
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Conductores
          </Button>
          <Button asChild>
            <Link href="/dashboard/users/create?type=driver">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Conductor
            </Link>
          </Button>
        </div>
      </div>

      {/* Driver Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Conductores
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">
              Todos los conductores registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conductores Activos
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDrivers}</div>
            <p className="text-xs text-muted-foreground">
              {total > 0 ? Math.round((activeDrivers / total) * 100) : 0}% del
              total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Vehículo</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {drivers.filter((driver: any) => driver.vehicle).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Conductores con vehículo asignado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificados</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                drivers.filter(
                  (driver: any) =>
                    driver.isEmailVerified && driver.isPhoneVerified
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Email y teléfono verificados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conductores por nombre, email o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Conductores</CardTitle>
          <CardDescription>
            {loading
              ? 'Cargando conductores...'
              : `${total} conductores encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : drivers.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                No se encontraron conductores
              </h3>
              <p className="text-muted-foreground">
                Ajusta los filtros o crea un nuevo conductor.
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/users/create?type=driver">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Conductor
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conductor</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Socio</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver: any) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/avatars/driver-${driver.id}.png`}
                            />
                            <AvatarFallback>
                              {getInitials(driver.firstName, driver.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              <Link
                                href={`/dashboard/users/${driver.id}`}
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {driver.firstName} {driver.lastName}
                              </Link>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {driver.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            <span
                              className={
                                driver.isEmailVerified
                                  ? 'text-green-600'
                                  : 'text-muted-foreground'
                              }
                            >
                              {driver.isEmailVerified
                                ? 'Verificado'
                                : 'Sin verificar'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            <span
                              className={
                                driver.isPhoneVerified
                                  ? 'text-green-600'
                                  : 'text-muted-foreground'
                              }
                            >
                              {driver.isPhoneVerified
                                ? 'Verificado'
                                : 'Sin verificar'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver.vehicle ? (
                          <div className="text-sm">
                            <div className="font-medium">
                              {driver.vehicle.make} {driver.vehicle.model}
                            </div>
                            <div className="text-muted-foreground">
                              {driver.vehicle.plate} • {driver.vehicle.year}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Sin vehículo
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {driver.isEnabled ? (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            <UserCheck className="h-3 w-3 mr-1" />
                            Activo
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            <UserX className="h-3 w-3 mr-1" />
                            Desactivado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {driver.partner ? (
                          <div className="text-sm">
                            <div className="font-medium">
                              {driver.partner.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Sin asignar
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(driver.createdAt)}
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
                              <Link href={`/dashboard/users/${driver.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver perfil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/users/${driver.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {driver.isEnabled ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activar
                                </>
                              )}
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
