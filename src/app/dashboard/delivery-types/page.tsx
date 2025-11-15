'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
// import { GET_DELIVERY_TYPES } from '@/lib/graphql/generated';
// import { CREATE_DELIVERY_TYPE, UPDATE_DELIVERY_TYPE } from '@/lib/graphql/generated';
// Mock data imports removed - using real GraphQL
import React from 'react';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Search,
  Truck,
  Package,
  Clock,
  Zap,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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

interface DeliveryType {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isEnabled: boolean;
  actions?: never; // Para la columna de acciones del DataTable
}

const iconOptions = [
  { value: 'truck', label: 'Camión', icon: Truck },
  { value: 'package', label: 'Paquete', icon: Package },
  { value: 'clock', label: 'Rápido', icon: Clock },
  { value: 'zap', label: 'Express', icon: Zap },
];

export default function DeliveryTypesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<DeliveryType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'truck',
    isEnabled: true,
  });
  const router = useRouter();

  // TODO: Implement with real GraphQL queries from codegen
  // const { loading, error, data, refetch } = useQuery(GET_DELIVERY_TYPES);
  // const [createDeliveryType, { loading: creating }] = useMutation(CREATE_DELIVERY_TYPE);
  // const [updateDeliveryType, { loading: updating }] = useMutation(UPDATE_DELIVERY_TYPE);

  const loading = false;
  const error = null;
  const data: { deliveryTypes?: { data?: DeliveryType[] } } = {};
  const refetch = () => Promise.resolve();
  const createDeliveryType = () => Promise.resolve();
  const updateDeliveryType = () => Promise.resolve();
  const creating = false;
  const updating = false;

  const deliveryTypes = (data?.deliveryTypes?.data as DeliveryType[]) || [];
  const totalTypes = deliveryTypes.length;

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'truck',
      isEnabled: true,
    });
  };

  const handleCreateType = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditType = (type: DeliveryType) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      description: type.description || '',
      icon: type.icon || 'truck',
      isEnabled: type.isEnabled,
    });
    setIsEditDialogOpen(true);
  };

  const handleToggleStatus = async (type: DeliveryType) => {
    try {
      // TODO: Replace with real mutation when backend is ready
      await updateDeliveryType();
      toast.success(
        type.isEnabled
          ? 'Tipo de entrega deshabilitado'
          : 'Tipo de entrega habilitado'
      );
      refetch();
    } catch {
      toast.error('Error al cambiar el estado del tipo de entrega');
    }
  };

  const handleSubmitCreate = async () => {
    try {
      // TODO: Replace with real mutation when backend is ready
      await createDeliveryType();
      toast.success('Tipo de entrega creado exitosamente');
      setIsCreateDialogOpen(false);
      resetForm();
      refetch();
    } catch {
      toast.error('Error al crear el tipo de entrega');
    }
  };

  const handleSubmitEdit = async () => {
    if (!editingType) return;

    try {
      // TODO: Replace with real mutation when backend is ready
      await updateDeliveryType();
      toast.success('Tipo de entrega actualizado exitosamente');
      setIsEditDialogOpen(false);
      setEditingType(null);
      resetForm();
      refetch();
    } catch {
      toast.error('Error al actualizar el tipo de entrega');
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
  const enabledTypes = deliveryTypes.filter(
    (type: DeliveryType) => type.isEnabled
  ).length;

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find((option) => option.value === iconName);
    return iconOption?.icon || Truck;
  };

  const columns: Array<{
    key: keyof DeliveryType;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: DeliveryType) => React.ReactNode;
  }> = [
    {
      key: 'name' as keyof DeliveryType,
      label: 'Tipo de Entrega',
      sortable: true,
      render: (value: unknown, type: DeliveryType) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg border bg-gray-50 flex items-center justify-center">
            {React.createElement(getIcon(type.icon || 'truck'), {
              className: 'h-5 w-5 text-gray-600',
            })}
          </div>
          <div>
            <div className="font-medium">{String(value)}</div>
            {type.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {type.description}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'icon' as keyof DeliveryType,
      label: 'Icono',
      render: (value: unknown) =>{
        const iconOption = iconOptions.find((option) => option.value === value);
        return (
          <div className="flex items-center space-x-2">
            {React.createElement(iconOption?.icon || Truck, {
              className: 'h-4 w-4 text-muted-foreground',
            })}
            <span className="text-sm">{iconOption?.label || 'Camión'}</span>
          </div>
        );
      },
    },
    {
      key: 'isEnabled' as keyof DeliveryType,
      label: 'Estado',
      render: (value: unknown) =>(
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
      render: (value: unknown, type: DeliveryType) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditType(type)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStatus(type)}>
              {type.isEnabled ? (
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
        description="Gestiona los tipos de servicios de entrega disponibles"
        actionLabel="Crear Tipo"
        onAction={handleCreateType}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </PageHeader>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Tipos
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTypes}</div>
            <p className="text-xs text-muted-foreground">
              Tipos de entrega configurados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipos Activos</CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledTypes}</div>
            <p className="text-xs text-muted-foreground">
              {totalTypes > 0
                ? Math.round((enabledTypes / totalTypes) * 100)
                : 0}
              % del total
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
              {totalTypes - enabledTypes}
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
                  placeholder="Buscar tipos de entrega..."
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
          data={deliveryTypes as unknown as Record<string, unknown>[]}
          columns={columns as unknown as any}
          searchPlaceholder="Buscar tipos de entrega..."
          pageSize={pageSize}
          totalItems={totalTypes}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Tipo de Entrega</DialogTitle>
            <DialogDescription>
              Completa la información para crear un nuevo tipo de entrega
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: Entrega Express"
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe el tipo de entrega..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="icon">Icono</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData({ ...formData, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar icono" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <option.icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isEnabled"
                checked={formData.isEnabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isEnabled: checked })
                }
              />
              <Label htmlFor="isEnabled">Tipo de entrega activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitCreate}
              disabled={!formData.name.trim() || creating}
            >
              {creating ? 'Creando...' : 'Crear Tipo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tipo de Entrega</DialogTitle>
            <DialogDescription>
              Modifica la información del tipo de entrega
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: Entrega Express"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe el tipo de entrega..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-icon">Icono</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData({ ...formData, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar icono" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <option.icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isEnabled"
                checked={formData.isEnabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isEnabled: checked })
                }
              />
              <Label htmlFor="edit-isEnabled">Tipo de entrega activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitEdit}
              disabled={!formData.name.trim() || updating}
            >
              {updating ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
