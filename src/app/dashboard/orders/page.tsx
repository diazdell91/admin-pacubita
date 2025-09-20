'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { OrderStatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrdersQuery, type OrdersQuery, type Order } from '@/lib/graphql';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Search,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderFilters } from './components/OrderFilters';
import { formatDate, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const { loading, error, data, refetch } = useOrdersQuery({
    variables: {
      input: {
        pagination: {
          page: currentPage,
          size: pageSize,
        },
        ...filters,
      },
    },
    errorPolicy: 'all',
  });

  const orders = data?.orders?.orders || [];
  const totalOrders = data?.orders?.total || 0;

  const handleCreateOrder = () => {
    router.push('/dashboard/orders/create');
  };

  const handleViewOrder = (order: Order) => {
    router.push(`/dashboard/orders/${order.id}`);
  };

  const handleEditOrder = (order: Order) => {
    router.push(`/dashboard/orders/${order.id}/edit`);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      toast.success('Exportando pedidos...');
    } catch {
      toast.error('Error al exportar pedidos');
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
        <p className="text-red-600 mb-4">Error al cargar los pedidos</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  const columns = [
    {
      key: 'code' as keyof Order,
      label: 'Código',
      sortable: true,
      render: (value: any, order: Order) => (
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          {value}
        </Link>
      ),
    },
    {
      key: 'status' as keyof Order,
      label: 'Estado',
      sortable: true,
      render: (value: any) => <OrderStatusBadge status={value} size="sm" />,
    },
    {
      key: 'serviceType' as keyof Order,
      label: 'Servicio',
      render: (value: any) => (
        <Badge variant="outline" className="text-xs">
          {value === 'DELIVERY' ? 'Entrega' : 'Empaquetado'}
        </Badge>
      ),
    },
    {
      key: 'client' as keyof Order,
      label: 'Cliente',
      render: (value: any) => (
        <div className="text-sm">
          <div className="font-medium">
            {value.firstName} {value.lastName}
          </div>
        </div>
      ),
    },
    {
      key: 'recipient' as keyof Order,
      label: 'Destinatario',
      render: (value: any) => (
        <div className="text-sm">
          <div className="font-medium">
            {value.firstName} {value.lastName}
          </div>
          <div className="text-muted-foreground">{value.phone}</div>
        </div>
      ),
    },
    {
      key: 'partner' as keyof Order,
      label: 'Socio',
      render: (value: any) => <span className="text-sm">{value.name}</span>,
    },
    {
      key: 'driver' as keyof Order,
      label: 'Conductor',
      render: (value: any) => (
        <span className="text-sm">
          {value ? `${value.firstName} ${value.lastName}` : 'Sin asignar'}
        </span>
      ),
    },
    {
      key: 'total' as keyof Order,
      label: 'Total',
      sortable: true,
      render: (value: any) => (
        <span className="font-medium">{formatCurrency(value || 0)}</span>
      ),
    },
    {
      key: 'createdAt' as keyof Order,
      label: 'Fecha',
      sortable: true,
      render: (value: any) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(new Date(value))}
        </span>
      ),
    },
    {
      key: 'actions' as keyof Order,
      label: 'Acciones',
      render: (value: any, order: Order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditOrder(order)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Rastrear pedido</DropdownMenuItem>
            <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pedidos"
        description="Gestiona todos los pedidos del sistema"
        actionLabel="Crear Pedido"
        onAction={handleCreateOrder}
      >
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </PageHeader>

      {showFilters && <OrderFilters onFiltersChange={handleFiltersChange} />}

      <div className="rounded-md border bg-white">
        <DataTable
          data={orders}
          columns={columns}
          searchPlaceholder="Buscar por código, cliente o teléfono..."
          onRowClick={handleViewOrder}
          pageSize={pageSize}
          totalItems={totalOrders}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
