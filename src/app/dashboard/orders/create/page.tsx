'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { OrderForm } from '../components/OrderForm';
import { toast } from 'sonner';

const steps = [
  {
    id: 'client',
    title: 'Información del Cliente',
    description: 'Datos del remitente y destinatario',
  },
  {
    id: 'address',
    title: 'Direcciones',
    description: 'Direcciones de recogida y entrega',
  },
  {
    id: 'products',
    title: 'Productos',
    description: 'Artículos y servicios',
  },
  {
    id: 'addons',
    title: 'Servicios Adicionales',
    description: 'Recogida, empaquetado y otros',
  },
  {
    id: 'payment',
    title: 'Pago',
    description: 'Método de pago y facturación',
  },
  {
    id: 'review',
    title: 'Confirmación',
    description: 'Revisar y confirmar pedido',
  },
];

export interface OrderFormData {
  // Client Information
  client?: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  // Recipient Information
  recipient: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    identityCardNumber: string;
    notes?: string;
  };

  // Addresses
  senderAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };

  recipientAddress: {
    line1: string;
    line2?: string;
    neighborhood?: string;
    municipality: string;
    province: string;
    postalCode: string;
  };

  // Service Information
  serviceType: 'DELIVERY' | 'WRAPPING';
  partnerId: string;

  // Products
  items: Array<{
    productId: string;
    productType: 'ARTICLE' | 'LUGGAGE';
    quantity: number;
    variantId?: string;
    deliveryTypeId?: string;
  }>;

  // Add-ons
  addons: Array<{
    type: 'HOME_PICKUP' | 'HOME_WRAPPING';
    date: string;
    hourRangeStart: string;
    hourRangeEnd: string;
  }>;

  // Payment
  paymentMethod: {
    type: 'CARD' | 'PARTNER_BALANCE';
    cardId?: string;
  };

  // Pricing
  subtotal?: number;
  discount?: number;
  vat?: number;
  total?: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OrderFormData>({
    recipient: {
      firstName: '',
      lastName: '',
      phone: '',
      identityCardNumber: '',
    },
    senderAddress: {
      line1: '',
      city: '',
      state: '',
      zipCode: '',
    },
    recipientAddress: {
      line1: '',
      municipality: '',
      province: '',
      postalCode: '',
    },
    serviceType: 'DELIVERY',
    partnerId: '',
    items: [],
    addons: [],
    paymentMethod: {
      type: 'CARD',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleFormUpdate = (data: Partial<OrderFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Implement GraphQL mutation to create order
      console.log('Creating order with data:', formData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Pedido creado exitosamente');
      router.push('/orders');
    } catch (createError) {
      toast.error('Error al crear el pedido');
      console.error('Order creation error:', createError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

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
              Crear Nuevo Pedido
            </h1>
            <p className="text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}:{' '}
              {steps[currentStep].title}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso del pedido</span>
              <span>{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Steps Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center cursor-pointer ${
                  index <= currentStep
                    ? 'text-blue-600'
                    : 'text-muted-foreground'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index < currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : index === currentStep
                        ? 'border-blue-600 text-blue-600'
                        : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderForm
            step={steps[currentStep].id}
            data={formData}
            onUpdate={handleFormUpdate}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>

        <div className="flex items-center space-x-2">
          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
              {isSubmitting ? 'Creando Pedido...' : 'Crear Pedido'}
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
