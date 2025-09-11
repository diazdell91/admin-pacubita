'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CalendarIcon,
  Plus,
  Trash2,
  User,
  MapPin,
  Package,
  CreditCard,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { OrderFormData } from '../create/page';

interface OrderFormProps {
  step: string;
  data: OrderFormData;
  onUpdate: (data: Partial<OrderFormData>) => void;
}

// Mock data - will be replaced with GraphQL
const mockPartners = [
  { id: '1', name: 'Express Delivery' },
  { id: '2', name: 'Fast Courier' },
  { id: '3', name: 'Premium Package' },
];

const mockArticles = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy',
    price: 2250,
    variants: [
      { id: '1', name: '128GB Negro' },
      { id: '2', name: '256GB Azul' },
    ],
  },
  {
    id: '2',
    name: 'Tablet iPad Air',
    price: 3500,
    variants: [
      { id: '3', name: '64GB WiFi' },
      { id: '4', name: '256GB WiFi+Cellular' },
    ],
  },
];

const mockDeliveryTypes = [
  { id: '1', name: 'Entrega Express' },
  { id: '2', name: 'Entrega Estándar' },
  { id: '3', name: 'Entrega Premium' },
];

export function OrderForm({ step, data, onUpdate }: OrderFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const updateField = (field: string, value: any) => {
    const keys = field.split('.');
    if (keys.length === 1) {
      onUpdate({ [field]: value });
    } else if (keys.length === 2) {
      const currentValue = data[keys[0] as keyof OrderFormData];
      if (currentValue && typeof currentValue === 'object') {
        onUpdate({
          [keys[0]]: {
            ...currentValue,
            [keys[1]]: value,
          },
        });
      }
    }
  };

  const addItem = () => {
    const newItem = {
      productId: '',
      productType: 'ARTICLE' as const,
      quantity: 1,
      variantId: '',
      deliveryTypeId: '',
    };
    onUpdate({ items: [...data.items, newItem] });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = data.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate({ items: updatedItems });
  };

  const removeItem = (index: number) => {
    const updatedItems = data.items.filter((_, i) => i !== index);
    onUpdate({ items: updatedItems });
  };

  const addAddon = (type: 'HOME_PICKUP' | 'HOME_WRAPPING') => {
    const newAddon = {
      type,
      date: '',
      hourRangeStart: '09:00',
      hourRangeEnd: '11:00',
    };
    onUpdate({ addons: [...data.addons, newAddon] });
  };

  const removeAddon = (index: number) => {
    const updatedAddons = data.addons.filter((_, i) => i !== index);
    onUpdate({ addons: updatedAddons });
  };

  const calculateTotal = () => {
    const subtotal = data.items.reduce((sum, item) => {
      const article = mockArticles.find((a) => a.id === item.productId);
      return sum + (article ? article.price * item.quantity : 0);
    }, 0);

    const vat = subtotal * 0.13; // 13% IVA
    const total = subtotal + vat;

    onUpdate({ subtotal, vat, total });
  };

  switch (step) {
    case 'client':
      return (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Información del Remitente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-firstName">Nombre *</Label>
                    <Input
                      id="client-firstName"
                      value={data.client?.firstName || ''}
                      onChange={(e) =>
                        updateField('client.firstName', e.target.value)
                      }
                      placeholder="Juan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-lastName">Apellido *</Label>
                    <Input
                      id="client-lastName"
                      value={data.client?.lastName || ''}
                      onChange={(e) =>
                        updateField('client.lastName', e.target.value)
                      }
                      placeholder="Pérez"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={data.client?.email || ''}
                    onChange={(e) =>
                      updateField('client.email', e.target.value)
                    }
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-phone">Teléfono *</Label>
                  <Input
                    id="client-phone"
                    value={data.client?.phone || ''}
                    onChange={(e) =>
                      updateField('client.phone', e.target.value)
                    }
                    placeholder="+53 5555 5555"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recipient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Información del Destinatario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-firstName">Nombre *</Label>
                    <Input
                      id="recipient-firstName"
                      value={data.recipient.firstName}
                      onChange={(e) =>
                        updateField('recipient.firstName', e.target.value)
                      }
                      placeholder="María"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-lastName">Apellido *</Label>
                    <Input
                      id="recipient-lastName"
                      value={data.recipient.lastName}
                      onChange={(e) =>
                        updateField('recipient.lastName', e.target.value)
                      }
                      placeholder="García"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-email">Email</Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    value={data.recipient.email || ''}
                    onChange={(e) =>
                      updateField('recipient.email', e.target.value)
                    }
                    placeholder="maria@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-phone">Teléfono *</Label>
                  <Input
                    id="recipient-phone"
                    value={data.recipient.phone}
                    onChange={(e) =>
                      updateField('recipient.phone', e.target.value)
                    }
                    placeholder="+53 5555 5555"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-id">Cédula de Identidad *</Label>
                  <Input
                    id="recipient-id"
                    value={data.recipient.identityCardNumber}
                    onChange={(e) =>
                      updateField(
                        'recipient.identityCardNumber',
                        e.target.value
                      )
                    }
                    placeholder="85123456789"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-notes">Notas especiales</Label>
                  <Textarea
                    id="recipient-notes"
                    value={data.recipient.notes || ''}
                    onChange={(e) =>
                      updateField('recipient.notes', e.target.value)
                    }
                    placeholder="Instrucciones especiales para la entrega..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'address':
      return (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Sender Address */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Recogida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sender-line1">Dirección *</Label>
                  <Input
                    id="sender-line1"
                    value={data.senderAddress.line1}
                    onChange={(e) =>
                      updateField('senderAddress.line1', e.target.value)
                    }
                    placeholder="Calle 23 #456"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-line2">Apartamento/Oficina</Label>
                  <Input
                    id="sender-line2"
                    value={data.senderAddress.line2 || ''}
                    onChange={(e) =>
                      updateField('senderAddress.line2', e.target.value)
                    }
                    placeholder="Apto 2B"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-city">Ciudad *</Label>
                    <Input
                      id="sender-city"
                      value={data.senderAddress.city}
                      onChange={(e) =>
                        updateField('senderAddress.city', e.target.value)
                      }
                      placeholder="La Habana"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-state">Estado/Provincia *</Label>
                    <Input
                      id="sender-state"
                      value={data.senderAddress.state}
                      onChange={(e) =>
                        updateField('senderAddress.state', e.target.value)
                      }
                      placeholder="La Habana"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-zip">Código Postal *</Label>
                  <Input
                    id="sender-zip"
                    value={data.senderAddress.zipCode}
                    onChange={(e) =>
                      updateField('senderAddress.zipCode', e.target.value)
                    }
                    placeholder="10400"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recipient Address */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-line1">Dirección *</Label>
                  <Input
                    id="recipient-line1"
                    value={data.recipientAddress.line1}
                    onChange={(e) =>
                      updateField('recipientAddress.line1', e.target.value)
                    }
                    placeholder="Avenida 5ta #123"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-line2">Apartamento/Oficina</Label>
                  <Input
                    id="recipient-line2"
                    value={data.recipientAddress.line2 || ''}
                    onChange={(e) =>
                      updateField('recipientAddress.line2', e.target.value)
                    }
                    placeholder="Apto 3A"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-neighborhood">Barrio</Label>
                  <Input
                    id="recipient-neighborhood"
                    value={data.recipientAddress.neighborhood || ''}
                    onChange={(e) =>
                      updateField(
                        'recipientAddress.neighborhood',
                        e.target.value
                      )
                    }
                    placeholder="Miramar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-municipality">Municipio *</Label>
                    <Input
                      id="recipient-municipality"
                      value={data.recipientAddress.municipality}
                      onChange={(e) =>
                        updateField(
                          'recipientAddress.municipality',
                          e.target.value
                        )
                      }
                      placeholder="Playa"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-province">Provincia *</Label>
                    <Input
                      id="recipient-province"
                      value={data.recipientAddress.province}
                      onChange={(e) =>
                        updateField('recipientAddress.province', e.target.value)
                      }
                      placeholder="La Habana"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-postal">Código Postal *</Label>
                  <Input
                    id="recipient-postal"
                    value={data.recipientAddress.postalCode}
                    onChange={(e) =>
                      updateField('recipientAddress.postalCode', e.target.value)
                    }
                    placeholder="11300"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'products':
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Artículos del Pedido</h3>
              <p className="text-sm text-muted-foreground">
                Selecciona los productos que se incluirán en este pedido
              </p>
            </div>
            <Button onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Artículo
            </Button>
          </div>

          <div className="space-y-4">
            {data.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="space-y-2">
                      <Label>Producto *</Label>
                      <Select
                        value={item.productId}
                        onValueChange={(value) =>
                          updateItem(index, 'productId', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockArticles.map((article) => (
                            <SelectItem key={article.id} value={article.id}>
                              {article.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {item.productId && (
                      <div className="space-y-2">
                        <Label>Variante</Label>
                        <Select
                          value={item.variantId || ''}
                          onValueChange={(value) =>
                            updateItem(index, 'variantId', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockArticles
                              .find((a) => a.id === item.productId)
                              ?.variants.map((variant) => (
                                <SelectItem key={variant.id} value={variant.id}>
                                  {variant.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Tipo de Entrega</Label>
                      <Select
                        value={item.deliveryTypeId || ''}
                        onValueChange={(value) =>
                          updateItem(index, 'deliveryTypeId', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDeliveryTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Cantidad *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'quantity',
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {data.items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="mx-auto h-12 w-12 mb-4" />
              <p>No hay artículos agregados</p>
              <p className="text-sm">
                Haz clic en "Agregar Artículo" para comenzar
              </p>
            </div>
          )}
        </div>
      );

    case 'review':
      calculateTotal();
      return (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${((data.subtotal || 0) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (13%):</span>
                    <span>${((data.vat || 0) / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${((data.total || 0) / 100).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">Remitente:</div>
                  <div className="text-sm text-muted-foreground">
                    {data.client?.firstName} {data.client?.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.client?.phone}
                  </div>
                </div>

                <div>
                  <div className="font-medium">Destinatario:</div>
                  <div className="text-sm text-muted-foreground">
                    {data.recipient.firstName} {data.recipient.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.recipient.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Artículos ({data.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.items.map((item, index) => {
                  const article = mockArticles.find(
                    (a) => a.id === item.productId
                  );
                  const variant = article?.variants.find(
                    (v) => v.id === item.variantId
                  );
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div>
                        <div className="font-medium">
                          {article?.name || 'Producto desconocido'}
                        </div>
                        {variant && (
                          <div className="text-sm text-muted-foreground">
                            {variant.name}
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        $
                        {(
                          ((article?.price || 0) * item.quantity) /
                          100
                        ).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Formulario en desarrollo para el paso: {step}</p>
        </div>
      );
  }
}
