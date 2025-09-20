'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOrderQuery, type Order } from '@/lib/graphql';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { OrderStatusBadge } from '@/components/common/StatusBadge';
import { LoadingPage } from '@/components/common/LoadingSpinner';
import {
  ArrowLeft,
  Save,
  X,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDate, formatCurrency } from '@/lib/utils';

// Schema de validación para la edición de orden
const editOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']),
  senderFirstName: z.string().min(1, 'Nombre del remitente requerido'),
  senderLastName: z.string().min(1, 'Apellido del remitente requerido'),
  senderEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  senderPhone: z.string().min(1, 'Teléfono del remitente requerido'),
  senderAddressLine1: z.string().min(1, 'Dirección del remitente requerida'),
  senderAddressLine2: z.string().optional(),
  senderCity: z.string().min(1, 'Ciudad del remitente requerida'),
  senderState: z.string().min(1, 'Estado del remitente requerido'),
  recipientFirstName: z.string().min(1, 'Nombre del destinatario requerido'),
  recipientLastName: z.string().min(1, 'Apellido del destinatario requerido'),
  recipientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  recipientPhone: z.string().min(1, 'Teléfono del destinatario requerido'),
  recipientIdentityCardNumber: z.string().min(1, 'Cédula del destinatario requerida'),
  recipientAddressLine1: z.string().min(1, 'Dirección del destinatario requerida'),
  recipientAddressLine2: z.string().optional(),
  recipientNotes: z.string().optional(),
});

type EditOrderFormData = z.infer<typeof editOrderSchema>;

// Mapeo de estados de orden
const ORDER_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'PICKED_UP', label: 'Recogido' },
  { value: 'IN_TRANSIT', label: 'En Tránsito' },
  { value: 'DELIVERED', label: 'Entregado' },
  { value: 'CANCELLED', label: 'Cancelado' },
];

export default function EditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const form = useForm<EditOrderFormData>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      status: 'PENDING',
      senderFirstName: '',
      senderLastName: '',
      senderEmail: '',
      senderPhone: '',
      senderAddressLine1: '',
      senderAddressLine2: '',
      senderCity: '',
      senderState: '',
      recipientFirstName: '',
      recipientLastName: '',
      recipientEmail: '',
      recipientPhone: '',
      recipientIdentityCardNumber: '',
      recipientAddressLine1: '',
      recipientAddressLine2: '',
      recipientNotes: '',
    },
  });

  // Llenar el formulario cuando se carga la orden
  useEffect(() => {
    if (order) {
      form.reset({
        status: order.status as any,
        senderFirstName: order.sender?.firstName || '',
        senderLastName: order.sender?.lastName || '',
        senderEmail: order.sender?.email || '',
        senderPhone: order.sender?.phone || '',
        senderAddressLine1: order.sender?.address?.line1 || '',
        senderAddressLine2: order.sender?.address?.line2 || '',
        senderCity: order.sender?.address?.city || '',
        senderState: order.sender?.address?.state || '',
        recipientFirstName: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.firstName : '',
        recipientLastName: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.lastName : '',
        recipientEmail: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.email || '' : '',
        recipientPhone: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.phone : '',
        recipientIdentityCardNumber: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.identityCardNumber : '',
        recipientAddressLine1: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.address?.line1 || '' : '',
        recipientAddressLine2: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.address?.line2 || '' : '',
        recipientNotes: order.__typename === 'DeliveryOrder' && order.recipient ? order.recipient.notes || '' : '',
      });
    }
  }, [order, form]);

  const onSubmit = async (data: EditOrderFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement order update mutation when available in GraphQL schema
      // Current GraphQL schema only has useDropOffOrderMutation for orders
      console.log('Datos que se actualizarían:', data);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Funcionalidad de actualización no disponible temporalmente');
      toast.info('Los datos del formulario son válidos y están listos para enviar');

      // Don't navigate away for now, keep form data
      console.log('Formulario validado correctamente. Esperando implementación de mutación de actualización.');
    } catch (error) {
      console.error('Error al procesar la actualización:', error);
      toast.error('Error al procesar la actualización');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar la orden</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Editar Orden {order.code}</h1>
            <p className="text-muted-foreground">
              Creada el {formatDate(new Date(order.createdAt))}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Funcionalidad en Desarrollo
            </h3>
            <p className="text-sm text-yellow-700">
              La actualización de órdenes está actualmente en desarrollo.
              Puedes revisar y modificar los datos, pero los cambios no se guardarán temporalmente.
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información General */}
            <div className="lg:col-span-2 space-y-6">
              {/* Estado de la Orden */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado de la Orden</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ORDER_STATUS_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Información del Remitente */}
              <Card>
                <CardHeader>
                  <CardTitle>Información del Remitente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="senderFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="senderAddressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección Línea 1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="senderAddressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección Línea 2 (Opcional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="senderCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado/Provincia</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Información del Destinatario (solo para DeliveryOrder) */}
              {order.__typename === 'DeliveryOrder' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Destinatario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="recipientFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="recipientLastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="recipientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="recipientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="recipientIdentityCardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cédula de Identidad</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipientAddressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección Línea 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipientAddressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección Línea 2 (Opcional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipientNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Información de la Orden */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de la Orden</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Código:</span>
                    <span className="text-sm font-mono">{order.code}</span>
                  </div>
                  {order.externalId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID Externo:</span>
                      <span className="text-sm font-mono">{order.externalId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tipo:</span>
                    <span className="text-sm">
                      {order.serviceType === 'DELIVERY' ? 'Entrega' : 'Empaquetado'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Creado:</span>
                    <span className="text-sm">{formatDate(new Date(order.createdAt))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de Precios */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Precios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">{formatCurrency(order.subtotal || 0)}</span>
                  </div>
                  {order.vat && (
                    <div className="flex justify-between">
                      <span className="text-sm">IVA:</span>
                      <span className="text-sm">{formatCurrency(order.vat)}</span>
                    </div>
                  )}
                  {order.discount && order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Descuento:</span>
                      <span className="text-sm">-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total || 0)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Acciones */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}