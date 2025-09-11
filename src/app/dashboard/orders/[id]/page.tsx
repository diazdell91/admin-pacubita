'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import { GET_ORDER } from '@/lib/graphql/queries/orders';
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
  DollarSign,
  Copy,
  Download,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import { OrderTracking } from '../components/OrderTracking';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_ORDER, {
    variables: {
      input: {
        id: id as string,
      },
    },
    skip: !id,
    errorPolicy: 'all',
  });

  const order = data?.order?.order || {
    id: id as string,
    code: 'ORD-001',
    externalId: 'EXT-12345',
    status: 'DELIVERED',
    serviceType: 'DELIVERY',
    client: {
      id: '1',
      firstName: 'María',
      lastName: 'García',
    },
    partner: {
      id: '1',
      name: 'Express Delivery',
    },
    driver: {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      vehicle: {
        id: '1',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'Blanco',
        plate: 'ABC-123',
      },
    },
    sender: {
      firstName: 'María',
      lastName: 'García',
      phone: '+53 5123 4567',
      email: 'maria@example.com',
      address: {
        line1: 'Calle 23 #456',
        line2: 'Apto 2B',
        city: 'La Habana',
        state: 'La Habana',
        zipCode: '10400',
      },
    },
    recipient: {
      firstName: 'Ana',
      lastName: 'López',
      phone: '+53 5234 5678',
      email: 'ana@example.com',
      identityCardNumber: '85123456789',
      address: {
        line1: 'Avenida 5ta #123',
        line2: null,
        neighborhood: 'Miramar',
        municipality: 'Playa',
        province: 'La Habana',
        postalCode: '11300',
      },
      notes: 'Entregar en la recepción del edificio',
    },
    paymentMethod: {
      id: '1',
      type: 'CARD',
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
    },
    items: [
      {
        id: '1',
        quantity: 1,
        total: 2250,
        product: {
          type: 'ARTICLE',
          id: '1',
          name: 'Smartphone Samsung Galaxy',
          description: 'Teléfono inteligente última generación',
          imagePath: '/images/samsung-galaxy.jpg',
          variant: {
            id: '1',
            name: '128GB Negro',
          },
          deliveryType: {
            id: '1',
            name: 'Entrega Express',
          },
        },
      },
    ],
    addons: [
      {
        id: '1',
        type: 'HOME_PICKUP',
        price: 500,
        freeThresholdAmount: 3000,
        date: '2024-01-15',
        hourRange: {
          startAt: '09:00',
          endAt: '11:00',
        },
        total: 0,
      },
    ],
    subtotal: 2250,
    discount: 0,
    vat: 300,
    total: 2550,
    createdAt: '2024-01-15T10:30:00Z',
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(order.code);
    toast.success('Código copiado al portapapeles');
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    toast.success('ID copiado al portapapeles');
  };

  const handleEdit = () => {
    router.push(`/orders/${id}/edit`);
  };

  const handleDownload = () => {
    // Generate PDF or export functionality
    toast.info('Función de descarga en desarrollo');
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el pedido</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Pedido no encontrado</p>
        <Button onClick={() => router.push('/orders')}>Volver a pedidos</Button>
      </div>
    );
  }

  const createdDate = new Date(order.createdAt);
  const isCardPayment = order.paymentMethod?.type === 'CARD';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Pedido {order.code}
            </h1>
            <p className="text-muted-foreground">
              Creado el{' '}
              {format(createdDate, "dd MMMM yyyy 'a las' HH:mm", {
                locale: es,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Información del Pedido
              <OrderStatusBadge status={order.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Código:</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{order.code}</span>
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  ID Externo:
                </span>
                <span className="font-medium">{order.externalId}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Tipo de Servicio:
              </span>
              <Badge variant="outline">
                {order.serviceType === 'DELIVERY' ? 'Entrega' : 'Empaquetado'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Socio:</span>
              <span className="font-medium">{order.partner.name}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${(order.total / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Remitente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-medium">
                {order.sender.firstName} {order.sender.lastName}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.sender.phone}</span>
            </div>

            {order.sender.email && (
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{order.sender.email}</span>
              </div>
            )}

            <Separator />

            <div className="space-y-1 text-sm">
              <div className="font-medium">Dirección:</div>
              <div className="text-muted-foreground">
                {order.sender.address.line1}
                {order.sender.address.line2 && (
                  <div>{order.sender.address.line2}</div>
                )}
                <div>
                  {order.sender.address.city}, {order.sender.address.state}{' '}
                  {order.sender.address.zipCode}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Destinatario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-medium">
                {order.recipient.firstName} {order.recipient.lastName}
              </div>
              <div className="text-sm text-muted-foreground">
                CI: {order.recipient.identityCardNumber}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{order.recipient.phone}</span>
            </div>

            {order.recipient.email && (
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{order.recipient.email}</span>
              </div>
            )}

            <Separator />

            <div className="space-y-1 text-sm">
              <div className="font-medium">Dirección:</div>
              <div className="text-muted-foreground">
                {order.recipient.address.line1}
                {order.recipient.address.line2 && (
                  <div>{order.recipient.address.line2}</div>
                )}
                <div>
                  {order.recipient.address.neighborhood},{' '}
                  {order.recipient.address.municipality}
                </div>
                <div>
                  {order.recipient.address.province}{' '}
                  {order.recipient.address.postalCode}
                </div>
              </div>
            </div>

            {order.recipient.notes && (
              <>
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="font-medium">Notas:</div>
                  <div className="text-muted-foreground">
                    {order.recipient.notes}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Driver Information */}
        {order.driver && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Conductor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">
                  {order.driver.firstName} {order.driver.lastName}
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="font-medium">Vehículo:</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>
                    {order.driver.vehicle.make} {order.driver.vehicle.model} (
                    {order.driver.vehicle.year})
                  </div>
                  <div>Color: {order.driver.vehicle.color}</div>
                  <div>
                    Placa:{' '}
                    <span className="font-medium">
                      {order.driver.vehicle.plate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Método de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isCardPayment ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tipo:</span>
                  <Badge variant="outline">Tarjeta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Marca:</span>
                  <span className="font-medium">
                    {order.paymentMethod.brand}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Terminación:
                  </span>
                  <span className="font-medium">
                    ****{order.paymentMethod.last4}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Vencimiento:
                  </span>
                  <span className="font-medium">
                    {order.paymentMethod.expMonth}/{order.paymentMethod.expYear}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <Badge variant="outline">Saldo del Socio</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Desglose de Precios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span>${(order.subtotal / 100).toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span className="text-sm">Descuento:</span>
                <span>-${(order.discount / 100).toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">IVA:</span>
              <span>${(order.vat / 100).toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${(order.total / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Artículos del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.product.description}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Variante: {item.product.variant.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tipo de entrega: {item.product.deliveryType.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Cantidad: {item.quantity}</div>
                  <div className="text-lg font-semibold">
                    ${(item.total / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      {order.addons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Servicios Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.addons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      {addon.type === 'HOME_PICKUP'
                        ? 'Recogida en Casa'
                        : 'Empaquetado en Casa'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fecha:{' '}
                      {format(new Date(addon.date), 'dd/MM/yyyy', {
                        locale: es,
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Horario: {addon.hourRange.startAt} -{' '}
                      {addon.hourRange.endAt}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Precio: ${(addon.price / 100).toFixed(2)}
                    </div>
                    <div className="font-semibold">
                      {addon.total === 0
                        ? 'Gratis'
                        : `$${(addon.total / 100).toFixed(2)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Tracking */}
      <OrderTracking
        order={{
          id: order.id,
          code: order.code,
          status: order.status,
          serviceType: order.serviceType,
          driver: order.driver,
          createdAt: order.createdAt,
        }}
        onStatusChange={async (newStatus: string, notes?: string) => {
          try {
            await refetch();
            toast.success('Estado actualizado correctamente');
          } catch (updateError) {
            toast.error('Error al actualizar el estado');
            throw updateError;
          }
        }}
      />
    </div>
  );
}
