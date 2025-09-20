'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrderQuery, type Order } from '@/lib/graphql';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from '@/components/common/StatusBadge';
import { LoadingPage } from '@/components/common/LoadingSpinner';
import {
  ArrowLeft,
  Edit,
  MapPin,
  User,
  Truck,
  Phone,
  Mail,
  Package,
  CreditCard,
  Clock,
  Calendar,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { loading, error, data, refetch } = useOrderQuery({
    variables: {
      input: {
        id: id as string,
      },
    },
    skip: !id,
    errorPolicy: 'all',
  });

  const order = data?.order?.order;

  const handleCopyCode = () => {
    if (order?.code) {
      navigator.clipboard.writeText(order.code);
      toast.success('Código copiado al portapapeles');
    }
  };

  const handleCopyExternalId = () => {
    if (order?.externalId) {
      navigator.clipboard.writeText(order.externalId);
      toast.success('ID externo copiado al portapapeles');
    }
  };

  const handleEditOrder = () => {
    router.push(`/dashboard/orders/${id}/edit`);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el pedido</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pedido {order.code}</h1>
            <p className="text-muted-foreground">
              Creado el {formatDate(new Date(order.createdAt))}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <OrderStatusBadge status={order.status} />
          <Button onClick={handleEditOrder}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información General */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Código del Pedido
                  </label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono">{order.code}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyCode}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {order.externalId && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      ID Externo
                    </label>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono">{order.externalId}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyExternalId}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tipo de Servicio
                  </label>
                  <Badge variant="outline">
                    {order.serviceType === 'DELIVERY' ? 'Entrega' : 'Empaquetado'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Estado
                  </label>
                  <div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cliente */}
          {order.client && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Cliente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.client.firstName} {order.client.lastName}
                  </p>
                  {/* Email y teléfono no disponibles en el esquema actual */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conductor */}
          {order.driver && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Conductor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.driver.firstName} {order.driver.lastName}
                  </p>
                  {/* Email y teléfono no disponibles en el esquema actual */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Remitente (Sender) */}
          {order.sender && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Remitente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">
                      {order.sender.firstName} {order.sender.lastName}
                    </p>
                    <div className="space-y-2 mt-2">
                      {order.sender.email && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{order.sender.email}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{order.sender.phone}</span>
                      </div>
                    </div>
                  </div>

                  {order.sender.address && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Dirección</h4>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p>{order.sender.address.line1}</p>
                          {order.sender.address.line2 && (
                            <p>{order.sender.address.line2}</p>
                          )}
                          <p>{order.sender.address.city}, {order.sender.address.state}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Destinatario (Recipient) */}
          {order.__typename === 'DeliveryOrder' && order.recipient && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Destinatario</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">
                      {order.recipient.firstName} {order.recipient.lastName}
                    </p>
                    <div className="space-y-2 mt-2">
                      {order.recipient.email && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{order.recipient.email}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{order.recipient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>CI: {order.recipient.identityCardNumber}</span>
                      </div>
                    </div>
                  </div>

                  {order.recipient.address && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Dirección de Entrega</h4>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p>{order.recipient.address.line1}</p>
                          {order.recipient.address.line2 && (
                            <p>{order.recipient.address.line2}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {order.recipient.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Notas</h4>
                      <p className="text-sm bg-muted p-3 rounded-md">{order.recipient.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Productos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Productos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name || `Producto ${index + 1}`}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description || 'Sin descripción'}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">
                          Cantidad: {item.quantity || 1}
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(item.price || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Socio */}
          {order.partner && (
            <Card>
              <CardHeader>
                <CardTitle>Socio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{order.partner.name}</p>
              </CardContent>
            </Card>
          )}

          {/* Resumen de Pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Resumen de Pago</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal || 0)}</span>
              </div>
              {/* DeliveryFee no disponible en el esquema actual */}
              {order.vat && (
                <div className="flex justify-between">
                  <span>IVA:</span>
                  <span>{formatCurrency(order.vat)}</span>
                </div>
              )}
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(order.total || 0)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Método de Pago */}
          {order.paymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline">{order.paymentMethod.type}</Badge>
                  {/* Detalles de tarjeta no disponibles en el esquema actual */}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}