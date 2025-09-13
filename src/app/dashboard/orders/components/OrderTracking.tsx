'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrderStatusBadge, OrderStatus } from '@/components/common/StatusBadge';
import { UPDATE_ORDER_STATUS } from '@/lib/graphql/mutations/orders';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  CheckCircle,
  Clock,
  Truck,
  Package,
  MapPin,
  User,
  AlertCircle,
  Edit,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

// Order status flow definition
const statusFlow: Array<{
  status: OrderStatus;
  label: string;
  icon: any;
  color: string;
}> = [
  {
    status: 'PENDING',
    label: 'Pendiente',
    icon: Clock,
    color: 'text-yellow-500',
  },
  {
    status: 'CONFIRMED',
    label: 'Confirmado',
    icon: CheckCircle,
    color: 'text-blue-500',
  },
  {
    status: 'ACCEPTED',
    label: 'Aceptado',
    icon: User,
    color: 'text-purple-500',
  },
  {
    status: 'PICKED_UP',
    label: 'Recogido',
    icon: Package,
    color: 'text-indigo-500',
  },
  {
    status: 'DROPPED_OFF',
    label: 'Depositado',
    icon: Truck,
    color: 'text-orange-500',
  },
  { status: 'SHIPPED', label: 'Enviado', icon: Truck, color: 'text-cyan-500' },
  {
    status: 'DELIVERED',
    label: 'Entregado',
    icon: CheckCircle,
    color: 'text-green-500',
  },
];

const failureStates: Array<{
  status: OrderStatus;
  label: string;
  icon: any;
  color: string;
}> = [
  {
    status: 'CANCELLED',
    label: 'Cancelado',
    icon: AlertCircle,
    color: 'text-red-500',
  },
  {
    status: 'FAILED',
    label: 'Fallido',
    icon: AlertCircle,
    color: 'text-red-500',
  },
];

interface OrderTrackingProps {
  order: {
    id: string;
    code: string;
    status: OrderStatus;
    serviceType: string;
    driver?: {
      firstName: string;
      lastName: string;
      phone?: string;
    } | null;
    createdAt: string;
  };
  timeline?: Array<{
    id: string;
    status: OrderStatus;
    timestamp: string;
    notes?: string;
    updatedBy?: string;
  }>;
  onStatusChange?: (newStatus: OrderStatus, notes?: string) => void;
}

export function OrderTracking({
  order,
  timeline = [],
  onStatusChange,
}: OrderTrackingProps) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [notes, setNotes] = useState('');

  const [updateOrderStatus, { loading: updating }] = useMutation(
    UPDATE_ORDER_STATUS,
    {
      onCompleted: () => {
        toast.success('Estado del pedido actualizado');
        setIsChangingStatus(false);
        setNewStatus('');
        setNotes('');
      },
      onError: (error) => {
        console.error('Error updating order status:', error);
        toast.error('Error al actualizar el estado');
      },
    }
  );

  // TODO: Use real timeline data from GraphQL
  const actualTimeline = timeline.length > 0 ? timeline : [];

  const getCurrentStatusIndex = () => {
    return statusFlow.findIndex((s) => s.status === order.status);
  };

  const getAvailableNextStatuses = () => {
    const currentIndex = getCurrentStatusIndex();
    if (currentIndex === -1) return statusFlow;

    // Can move to next status or any failure state
    const nextStatuses = statusFlow.slice(currentIndex + 1);
    return [...nextStatuses, ...failureStates];
  };

  const handleStatusChange = async () => {
    if (!newStatus) return;

    try {
      if (onStatusChange) {
        onStatusChange(newStatus as OrderStatus, notes);
      } else {
        updateOrderStatus({
          variables: {
            input: {
              orderId: order.id,
              status: newStatus,
              notes: notes || undefined,
            },
          },
        });
      }
    } catch {
      console.error('Error in handleStatusChange:', error);
    }
  };

  const getStatusInfo = (status: OrderStatus) => {
    return [...statusFlow, ...failureStates].find((s) => s.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Estado Actual
            </CardTitle>

            <Dialog open={isChangingStatus} onOpenChange={setIsChangingStatus}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Cambiar Estado
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar Estado del Pedido</DialogTitle>
                  <DialogDescription>
                    Selecciona el nuevo estado para el pedido {order.code}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nuevo Estado</Label>
                    <Select
                      value={newStatus}
                      onValueChange={(value) =>
                        setNewStatus(value as OrderStatus)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableNextStatuses().map((status) => (
                          <SelectItem key={status.status} value={status.status}>
                            <div className="flex items-center space-x-2">
                              <status.icon
                                className={`h-4 w-4 ${status.color}`}
                              />
                              <span>{status.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Notas (opcional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Agregar notas sobre el cambio de estado..."
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingStatus(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleStatusChange}
                    disabled={!newStatus || updating}
                  >
                    {updating ? 'Actualizando...' : 'Actualizar Estado'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <OrderStatusBadge status={order.status} />
            {order.driver && (
              <div className="text-sm text-muted-foreground">
                Conductor: {order.driver.firstName} {order.driver.lastName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Cronología del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actualTimeline
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((event, index) => {
                const statusInfo = getStatusInfo(event.status as OrderStatus);
                const StatusIcon = statusInfo?.icon || Clock;

                return (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        index === 0
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <StatusIcon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">
                          {statusInfo?.label || event.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(
                            new Date(event.timestamp),
                            'dd MMM yyyy, HH:mm',
                            { locale: es }
                          )}
                        </span>
                      </div>

                      {event.notes && (
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.notes}
                        </p>
                      )}

                      {event.updatedBy && (
                        <p className="text-xs text-muted-foreground">
                          Actualizado por: {event.updatedBy}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Status Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Flujo de Estados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {statusFlow.map((step, index) => {
              const currentIndex = getCurrentStatusIndex();
              const isCompleted = currentIndex > index;
              const isCurrent = currentIndex === index;
              const StatusIcon = step.icon;

              return (
                <div key={step.status} className="flex items-center">
                  <div className="flex flex-col items-center space-y-2 min-w-0">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted
                          ? 'bg-green-600 border-green-600 text-white'
                          : isCurrent
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-xs font-medium ${
                          isCompleted || isCurrent
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>

                  {index < statusFlow.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Driver Information */}
      {order.driver && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Información del Conductor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="font-medium">
                {order.driver.firstName} {order.driver.lastName}
              </div>
              {order.driver.phone && (
                <div className="text-sm text-muted-foreground">
                  Teléfono: {order.driver.phone}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
