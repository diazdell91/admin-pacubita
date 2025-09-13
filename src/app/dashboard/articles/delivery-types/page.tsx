'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeliveryTypesQuery } from '@/lib/graphql/generated';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Truck,
  ToggleLeft,
  ToggleRight,
  Download,
} from 'lucide-react';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeliveryType {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  isEnabled: boolean;
}

export default function DeliveryTypesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  const { loading, error, data, refetch } = useDeliveryTypesQuery({
    variables: {
      input: {
        _: null, // Required placeholder field
      },
    },
    errorPolicy: 'all',
  });

  const deliveryTypes = data?.deliveryTypes?.deliveryTypes || [];
  const totalDeliveryTypes = deliveryTypes.length;

  const handleCreateDeliveryType = () => {
    router.push('/dashboard/articles/delivery-types/create');
  };

  const handleViewDeliveryType = (deliveryType: DeliveryType) => {
    router.push(`/dashboard/articles/delivery-types/${deliveryType.id}`);
  };

  const handleEditDeliveryType = (deliveryType: DeliveryType) => {
    router.push(`/dashboard/articles/delivery-types/${deliveryType.id}/edit`);
  };

  const handleToggleStatus = async (deliveryType: DeliveryType) => {
    try {
      // TODO: Implement toggle delivery type status mutation
      toast.success(
        deliveryType.isEnabled
          ? 'Tipo de entrega deshabilitado'
          : 'Tipo de entrega habilitado'
      );
      await refetch();
    } catch {
      toast.error('Error al cambiar el estado del tipo de entrega');
    }
  };

  const handleExport = async () => {
    try {
      toast.success('Exportando tipos de entrega...');
    } catch {
      toast.error('Error al exportar tipos de entrega');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">
          Error al cargar los tipos de entrega
        </p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  // Statistics
  const enabledDeliveryTypes = deliveryTypes.filter(
    (dt) => dt.isEnabled
  ).length;
  const deliveryTypesWithIcons = deliveryTypes.filter((dt) => dt.icon).length;

  const columns = [
    {
      key: 'name' as keyof DeliveryType,
      label: 'Tipo de Entrega',
      sortable: true,
      render: (value: any, deliveryType: DeliveryType) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg border bg-gray-50 flex items-center justify-center">
            {deliveryType.icon ? (
              <span className="text-lg">{deliveryType.icon}</span>
            ) : (
              <Truck className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <Link
              href={`/dashboard/articles/delivery-types/${deliveryType.id}`}
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {value}
            </Link>
            {deliveryType.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {deliveryType.description}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'description' as keyof DeliveryType,
      label: 'Descripción',
      render: (value: any) => (
        <div className="max-w-xs">
          {value ? (
            <p className="text-sm line-clamp-2">{value}</p>
          ) : (
            <span className="text-sm text-muted-foreground">
              Sin descripción
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'isEnabled' as keyof DeliveryType,
      label: 'Estado',
      render: (value: any) => (
        <Badge
          variant={value ? 'default' : 'secondary'}
          className={
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }
        >
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof DeliveryType,
      label: 'Acciones',
      render: (value: any, deliveryType: DeliveryType) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleViewDeliveryType(deliveryType)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleEditDeliveryType(deliveryType)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStatus(deliveryType)}>
              {deliveryType.isEnabled ? (
                <>
                  <ToggleLeft className="mr-2 h-4 w-4" />
                  Deshabilitar
                </>
              ) : (
                <>
                  <ToggleRight className="mr-2 h-4 w-4" />
                  Habilitar
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tipos de Entrega"
        description="Gestiona los tipos de entrega disponibles en el sistema"
        actionLabel="Crear Tipo de Entrega"
        onAction={handleCreateDeliveryType}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </PageHeader>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Tipos
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveryTypes}</div>
            <p className="text-xs text-muted-foreground">
              {enabledDeliveryTypes} activos de {totalDeliveryTypes} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habilitados</CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledDeliveryTypes}</div>
            <p className="text-xs text-muted-foreground">
              {totalDeliveryTypes > 0
                ? Math.round((enabledDeliveryTypes / totalDeliveryTypes) * 100)
                : 0}
              % del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Iconos</CardTitle>
            <span className="text-lg">🎨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryTypesWithIcons}</div>
            <p className="text-xs text-muted-foreground">
              Tipos con iconos personalizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalDeliveryTypes - enabledDeliveryTypes}
            </div>
            <p className="text-xs text-muted-foreground">
              Tipos deshabilitados
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
                  placeholder="Buscar tipos de entrega por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="enabled">Activos</SelectItem>
                  <SelectItem value="disabled">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white">
        <DataTable
          data={deliveryTypes as any}
          columns={columns as any}
          searchPlaceholder="Buscar tipos de entrega..."
          onRowClick={handleViewDeliveryType as any}
          pageSize={pageSize}
          totalItems={totalDeliveryTypes}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
