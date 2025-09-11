'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface OrderFiltersProps {
  onFiltersChange: (filters: OrderFilterValues) => void;
}

export interface OrderFilterValues {
  status?: string;
  serviceType?: string;
  partnerId?: string;
  driverId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  clientSearch?: string;
  codeSearch?: string;
}

export function OrderFilters({ onFiltersChange }: OrderFiltersProps) {
  const [filters, setFilters] = useState<OrderFilterValues>({});

  const statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'CONFIRMED', label: 'Confirmado' },
    { value: 'ACCEPTED', label: 'Aceptado' },
    { value: 'PICKED_UP', label: 'Recogido' },
    { value: 'DROPPED_OFF', label: 'Depositado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELLED', label: 'Cancelado' },
    { value: 'FAILED', label: 'Fallido' },
  ];

  const serviceTypeOptions = [
    { value: 'DELIVERY', label: 'Entrega' },
    { value: 'WRAPPING', label: 'Empaquetado' },
  ];

  // Mock partners - will be replaced with GraphQL data
  const partnerOptions = [
    { value: '1', label: 'Express Delivery' },
    { value: '2', label: 'Fast Courier' },
    { value: '3', label: 'Premium Package' },
  ];

  const updateFilter = (key: keyof OrderFilterValues, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof OrderFilterValues) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter(
      (key) =>
        filters[key as keyof OrderFilterValues] !== undefined &&
        filters[key as keyof OrderFilterValues] !== ''
    ).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {getActiveFiltersCount()} activos
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              disabled={getActiveFiltersCount() === 0}
            >
              Limpiar Todo
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status-filter">Estado</Label>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.status || ''}
                onValueChange={(value) =>
                  updateFilter('status', value || undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los estados</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filters.status && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('status')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Service Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="service-type-filter">Tipo de Servicio</Label>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.serviceType || ''}
                onValueChange={(value) =>
                  updateFilter('serviceType', value || undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los servicios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los servicios</SelectItem>
                  {serviceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filters.serviceType && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('serviceType')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Partner Filter */}
          <div className="space-y-2">
            <Label htmlFor="partner-filter">Socio</Label>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.partnerId || ''}
                onValueChange={(value) =>
                  updateFilter('partnerId', value || undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los socios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los socios</SelectItem>
                  {partnerOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filters.partnerId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('partnerId')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Code Search */}
          <div className="space-y-2">
            <Label htmlFor="code-search">Código de Pedido</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="code-search"
                placeholder="ORD-001..."
                value={filters.codeSearch || ''}
                onChange={(e) =>
                  updateFilter('codeSearch', e.target.value || undefined)
                }
              />
              {filters.codeSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('codeSearch')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date From */}
          <div className="space-y-2">
            <Label>Fecha Desde</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !filters.dateFrom && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom
                      ? format(filters.dateFrom, 'PPP', { locale: es })
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) => updateFilter('dateFrom', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {filters.dateFrom && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('dateFrom')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <Label>Fecha Hasta</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !filters.dateTo && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo
                      ? format(filters.dateTo, 'PPP', { locale: es })
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) => updateFilter('dateTo', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {filters.dateTo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('dateTo')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Client Search */}
          <div className="space-y-2">
            <Label htmlFor="client-search">Cliente</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="client-search"
                placeholder="Buscar por nombre..."
                value={filters.clientSearch || ''}
                onChange={(e) =>
                  updateFilter('clientSearch', e.target.value || undefined)
                }
              />
              {filters.clientSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('clientSearch')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              Filtros activos:
            </span>

            {filters.status && (
              <Badge variant="secondary" className="text-xs">
                Estado:{' '}
                {statusOptions.find((s) => s.value === filters.status)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('status')}
                  className="ml-1 h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.serviceType && (
              <Badge variant="secondary" className="text-xs">
                Servicio:{' '}
                {
                  serviceTypeOptions.find(
                    (s) => s.value === filters.serviceType
                  )?.label
                }
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('serviceType')}
                  className="ml-1 h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filters.partnerId && (
              <Badge variant="secondary" className="text-xs">
                Socio:{' '}
                {
                  partnerOptions.find((p) => p.value === filters.partnerId)
                    ?.label
                }
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter('partnerId')}
                  className="ml-1 h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
