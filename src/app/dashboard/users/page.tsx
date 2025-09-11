'use client';

import { useState } from 'react';
// TODO: Replace with useQuery when backend endpoint is ready
// import { useQuery } from '@apollo/client/react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Shield,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// TODO: Replace with actual GraphQL query when backend is ready
// import { GET_USERS } from '@/lib/graphql/queries/users';
import Link from 'next/link';

const USER_TYPES = [
  { value: 'all', label: 'Todos los usuarios', icon: Users },
  { value: 'client', label: 'Clientes', icon: Users, color: 'text-blue-600' },
  {
    value: 'driver',
    label: 'Conductores',
    icon: Users,
    color: 'text-green-600',
  },
  { value: 'partner', label: 'Socios', icon: Shield, color: 'text-purple-600' },
  { value: 'staff', label: 'Personal', icon: Shield, color: 'text-orange-600' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'enabled', label: 'Activos' },
  { value: 'disabled', label: 'Desactivados' },
];

// TODO: Remove mock data when backend GraphQL endpoint is ready
const MOCK_USERS = {
  users: {
    data: [
      {
        id: '1',
        email: 'juan.perez@email.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '+1-555-0123',
        type: 'CLIENT',
        isEnabled: true,
        createdAt: '2024-01-15T10:30:00Z',
        profile: {
          avatar: null,
          address: 'Calle 123, Ciudad',
        },
      },
      {
        id: '2',
        email: 'maria.garcia@email.com',
        firstName: 'María',
        lastName: 'García',
        phone: '+1-555-0124',
        type: 'DRIVER',
        isEnabled: true,
        createdAt: '2024-01-16T14:20:00Z',
        profile: {
          avatar: null,
          address: 'Avenida 456, Ciudad',
        },
      },
      {
        id: '3',
        email: 'carlos.lopez@email.com',
        firstName: 'Carlos',
        lastName: 'López',
        phone: '+1-555-0125',
        type: 'PARTNER',
        isEnabled: false,
        createdAt: '2024-01-17T09:15:00Z',
        profile: {
          avatar: null,
          address: 'Plaza 789, Ciudad',
        },
      },
    ],
    pagination: {
      total: 3,
      page: 1,
      limit: 20,
      totalPages: 1,
    },
  },
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // TODO: Replace with actual GraphQL query when backend is ready
  // const { data, loading, error, refetch } = useQuery(GET_USERS, {
  //   variables: {
  //     input: {
  //       type: typeFilter !== 'all' ? typeFilter.toUpperCase() : undefined,
  //       isEnabled:
  //         statusFilter === 'enabled'
  //           ? true
  //           : statusFilter === 'disabled'
  //             ? false
  //             : undefined,
  //       search: searchTerm || undefined,
  //       pagination: {
  //         page: currentPage,
  //         limit: pageSize,
  //       },
  //       sorting: {
  //         field: 'createdAt',
  //         order: -1, // DESC
  //       },
  //     },
  //   },
  //   fetchPolicy: 'cache-and-network',
  // });

  // Mock data implementation - remove when backend is ready
  const data = MOCK_USERS;
  const loading = false;
  const error = null;
  const refetch = () => Promise.resolve({ data: MOCK_USERS });

  const getTypeConfig = (type: string) => {
    return (
      USER_TYPES.find((t) => t.value === type.toLowerCase()) || USER_TYPES[0]
    );
  };

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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error al cargar usuarios
          </h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const users = data?.users?.users || [];
  const total = data?.users?.total || 0;

  // Calculate stats by type
  const stats = USER_TYPES.slice(1).map((type) => {
    const count = users.filter(
      (user: any) => user.type.toLowerCase() === type.value
    ).length;
    const activeCount = users.filter(
      (user: any) => user.type.toLowerCase() === type.value && user.isEnabled
    ).length;

    return {
      ...type,
      count,
      activeCount,
    };
  });

  const renderUserTable = (filteredUsers: any[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Socio</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user: any) => {
            const typeConfig = getTypeConfig(user.type);
            const TypeIcon = typeConfig.icon;

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/avatars/user-${user.id}.png`} />
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {user.firstName} {user.lastName}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={typeConfig.color}>
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {typeConfig.label.slice(0, -1)}{' '}
                    {/* Remove 's' from plural */}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      <span
                        className={
                          user.isEmailVerified
                            ? 'text-green-600'
                            : 'text-muted-foreground'
                        }
                      >
                        {user.isEmailVerified ? 'Verificado' : 'Sin verificar'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      <span
                        className={
                          user.isPhoneVerified
                            ? 'text-green-600'
                            : 'text-muted-foreground'
                        }
                      >
                        {user.isPhoneVerified ? 'Verificado' : 'Sin verificar'}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.isEnabled ? (
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
                  {user.partner ? (
                    <div className="text-sm">
                      <div className="font-medium">{user.partner.name}</div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Sin asignar
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(user.createdAt)}
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
                        <Link href={`/dashboard/users/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/users/${user.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {user.isEnabled ? (
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground">
            Administra clientes, conductores, socios y personal del sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/users/create">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <Card key={stat.value}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <StatIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.activeCount} activos de {stat.count} total
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
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
          </div>
        </CardContent>
      </Card>

      {/* Users Table with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {loading ? 'Cargando usuarios...' : `${total} usuarios encontrados`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTypeFilter}>
            <TabsList className="grid grid-cols-5 w-full">
              {USER_TYPES.map((type) => {
                const TypeIcon = type.icon;
                const count =
                  type.value === 'all'
                    ? total
                    : users.filter(
                        (user: any) => user.type.toLowerCase() === type.value
                      ).length;

                return (
                  <TabsTrigger
                    key={type.value}
                    value={type.value}
                    className="flex items-center gap-2"
                  >
                    <TypeIcon className="h-4 w-4" />
                    {type.label} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {USER_TYPES.map((type) => {
              const filteredUsers =
                type.value === 'all'
                  ? users
                  : users.filter(
                      (user: any) => user.type.toLowerCase() === type.value
                    );

              return (
                <TabsContent key={type.value} value={type.value}>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">
                        No se encontraron usuarios
                      </h3>
                      <p className="text-muted-foreground">
                        {type.value === 'all'
                          ? 'Ajusta los filtros o crea un nuevo usuario.'
                          : `No hay ${type.label.toLowerCase()} registrados.`}
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/dashboard/users/create">
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Usuario
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    renderUserTable(filteredUsers)
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
