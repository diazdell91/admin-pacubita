'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge, OrderStatus } from '@/components/common/StatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';
import {
  MoreHorizontal,
  Eye,
  Edit,
  MapPin,
  User,
  Truck,
  Clock,
  Phone,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

interface OrderCardProps {
  order: {
    id: string;
    code: string;
    status: OrderStatus;
    serviceType: string;
    client: { firstName: string; lastName: string };
    partner: { name: string };
    driver?: { firstName: string; lastName: string } | null;
    recipient: { firstName: string; lastName: string; phone: string };
    total: number;
    createdAt: string;
  };
  onView?: (order: any) => void;
  onEdit?: (order: any) => void;
}

export function OrderCard({ order, onView, onEdit }: OrderCardProps) {
  const createdDate = new Date(order.createdAt);

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link
              href={`/orders/${order.id}`}
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              {order.code}
            </Link>
            <div className="flex items-center space-x-2">
              <OrderStatusBadge status={order.status} size="sm" />
              <Badge variant="outline" className="text-xs">
                {order.serviceType === 'DELIVERY' ? 'Entrega' : 'Empaquetado'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">{formatCurrency(order.total)}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onView?.(order)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(order)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Rastrear pedido</DropdownMenuItem>
                <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Client Information */}
        <div className="flex items-center space-x-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <span className="font-medium">Cliente:</span>{' '}
            {order.client.firstName} {order.client.lastName}
          </div>
        </div>

        {/* Recipient Information */}
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <span className="font-medium">Destinatario:</span>{' '}
            {order.recipient.firstName} {order.recipient.lastName}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground ml-6">
          <Phone className="h-4 w-4" />
          <span>{order.recipient.phone}</span>
        </div>

        {/* Partner Information */}
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <div>
            <span className="font-medium">Socio:</span> {order.partner.name}
          </div>
        </div>

        {/* Driver Information */}
        <div className="flex items-center space-x-2 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <div>
            <span className="font-medium">Conductor:</span>{' '}
            {order.driver ? (
              `${order.driver.firstName} ${order.driver.lastName}`
            ) : (
              <span className="text-muted-foreground">Sin asignar</span>
            )}
          </div>
        </div>

        {/* Date Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>
              Creado: {format(createdDate, 'dd/MM/yyyy HH:mm', { locale: es })}
            </span>
          </div>
          <div>
            <span>{format(createdDate, 'dd MMM', { locale: es })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
