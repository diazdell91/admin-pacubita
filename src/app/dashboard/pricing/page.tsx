'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { usePricingRulesQuery } from '@/lib/graphql/generated';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Search,
  DollarSign,
  MapPin,
  Package,
  Truck,
  ToggleLeft,
  ToggleRight,
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PricingRule {
  id: string;
  type: string;
  isEnabled: boolean;
  price: number;
  partner?: {
    id: string;
    name: string;
  };
  location?: {
    id: string;
    name: string;
  };
  deliveryType?: {
    id: string;
    name: string;
  };
  article?: {
    id: string;
    name: string;
  };
  articleVariant?: {
    id: string;
    name: string;
  };
}

export default function PricingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const router = useRouter();

  const { loading, error, data, refetch } = usePricingRulesQuery({
    variables: {
      input: {
        isEnabled:
          statusFilter === 'all' ? undefined : statusFilter === 'enabled',
        type: typeFilter === 'all' ? undefined : typeFilter,
        pagination: {
          page: currentPage,
          limit: pageSize,
        },
        sorting: {
          field: 'createdAt',
          order: -1, // DESC
        },
      },
    },
    errorPolicy: 'all',
  });

  const pricingRules = (data as any)?.pricingRules?.pricingRules || [];
  const totalRules = pricingRules.length;

  const handleCreateRule = () => {
    router.push('/pricing/create');
  };

  const handleViewRule = (rule: PricingRule) => {
    router.push(`/pricing/${rule.id}`);
  };

  const handleEditRule = (rule: PricingRule) => {
    router.push(`/pricing/${rule.id}/edit`);
  };

  const handleToggleStatus = async (rule: PricingRule) => {
    try {
      // TODO: Implement toggle status mutation
      toast.success(
        rule.isEnabled ? 'Regla deshabilitada' : 'Regla habilitada'
      );
      await refetch();
    } catch {
      toast.error('Error al cambiar el estado de la regla');
    }
  };

  const handleExport = async () => {
    try {
      toast.success('Exportando reglas de precio...');
    } catch {
      toast.error('Error al exportar reglas de precio');
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
          Error al cargar las reglas de precio
        </p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  // Statistics
  const enabledRules = pricingRules.filter(
    (rule: PricingRule) => rule.isEnabled
  ).length;
  const averagePrice =
    pricingRules.length > 0
      ? pricingRules.reduce(
          (sum: number, rule: PricingRule) => sum + rule.price,
          0
        ) / pricingRules.length
      : 0;

  const columns = [
    {
      key: 'type' as keyof PricingRule,
      label: 'Tipo',
      sortable: true,
      render: (value: any, rule: PricingRule) => (
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs">
            {value === 'ARTICLE_PRICING_RULE' ? 'Artículo' : 'Equipaje'}
          </Badge>
          {rule.article && (
            <div className="text-sm font-medium">{rule.article.name}</div>
          )}
          {rule.articleVariant && (
            <div className="text-xs text-muted-foreground">
              {rule.articleVariant.name}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'price' as keyof PricingRule,
      label: 'Precio',
      sortable: true,
      render: (value: any) => (
        <div className="font-semibold text-green-600">
          ${(value / 100).toFixed(2)}
        </div>
      ),
    },
    {
      key: 'location' as keyof PricingRule,
      label: 'Ubicación',
      render: (value: any, rule: PricingRule) => (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {rule.location?.name || 'Todas las ubicaciones'}
          </span>
        </div>
      ),
    },
    {
      key: 'partner' as keyof PricingRule,
      label: 'Socio',
      render: (value: any, rule: PricingRule) => (
        <div className="text-sm">
          {rule.partner?.name || 'Todos los socios'}
        </div>
      ),
    },
    {
      key: 'deliveryType' as keyof PricingRule,
      label: 'Tipo de Entrega',
      render: (value: any, rule: PricingRule) => (
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {rule.deliveryType?.name || 'Todos los tipos'}
          </span>
        </div>
      ),
    },
    {
      key: 'isEnabled' as keyof PricingRule,
      label: 'Estado',
      render: (value: any) => (
        <Badge
          variant={value ? 'default' : 'secondary'}
          className={
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }
        >
          {value ? 'Activa' : 'Inactiva'}
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof PricingRule,
      label: 'Acciones',
      render: (value: any, rule: PricingRule) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleViewRule(rule)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditRule(rule)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStatus(rule)}>
              {rule.isEnabled ? (
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
            <DropdownMenuItem>Duplicar regla</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reglas de Precio"
        description="Gestiona el sistema de precios dinámicos del sistema"
        actionLabel="Crear Regla"
        onAction={handleCreateRule}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/pricing/calculator">
              <DollarSign className="mr-2 h-4 w-4" />
              Calculadora
            </Link>
          </Button>
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
              Total de Reglas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRules}</div>
            <p className="text-xs text-muted-foreground">
              {enabledRules} activas de {totalRules} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Precio Promedio
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(averagePrice / 100).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Precio promedio de todas las reglas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reglas Activas
            </CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledRules}</div>
            <p className="text-xs text-muted-foreground">
              {totalRules > 0
                ? Math.round((enabledRules / totalRules) * 100)
                : 0}
              % del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Artículos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                pricingRules.filter(
                  (rule: PricingRule) => rule.type === 'ARTICLE_PRICING_RULE'
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Reglas específicas por artículo
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
                  placeholder="Buscar reglas por artículo, ubicación o socio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="ARTICLE_PRICING_RULE">
                    Artículos
                  </SelectItem>
                  <SelectItem value="LUGGAGE_PRICING_RULE">Equipaje</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="enabled">Activas</SelectItem>
                  <SelectItem value="disabled">Inactivas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white">
        <DataTable
          data={pricingRules}
          columns={columns}
          searchPlaceholder="Buscar reglas de precio..."
          onRowClick={handleViewRule}
          pageSize={pageSize}
          totalItems={totalRules}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
