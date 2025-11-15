'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Calculator,
  DollarSign,
  MapPin,
  Package,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useArticlesQuery, usePartnersQuery, usePricingRulesQuery } from '@/lib/graphql/generated';
import { toast } from 'sonner';

interface CalculationResult {
  basePrice: number;
  locationMultiplier: number;
  partnerDiscount: number;
  finalPrice: number;
  rulesApplied: Array<{
    id: string;
    type: string;
    description: string;
    adjustment: number;
  }>;
}

export default function PricingCalculatorPage() {
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [calculation, setCalculation] = useState<CalculationResult | null>(
    null
  );

  // Mock data for locations - in real app this would come from GraphQL
  const locations = [
    { id: '1', name: 'La Habana' },
    { id: '2', name: 'Santiago de Cuba' },
    { id: '3', name: 'Camagüey' },
    { id: '4', name: 'Holguín' },
    { id: '5', name: 'Santa Clara' },
  ];

  const { data: articlesData } = useArticlesQuery({
    variables: { input: { isEnabled: true } },
  });

  const { data: partnersData } = usePartnersQuery({
    variables: { input: {} },
  });

  const { data: pricingRulesData } = usePricingRulesQuery({
    variables: { input: { isEnabled: true } },
  });

  const articles = (articlesData as any)?.articles?.articles || [];
  const partners = (partnersData as any)?.partners?.partners || [];
  const pricingRules =
    (pricingRulesData as any)?.pricingRules?.pricingRules || [];

  const selectedArticleData = articles.find(
    (article: any) => article.id === selectedArticle
  );
  const variants = selectedArticleData?.variants || [];

  const calculatePrice = () => {
    if (!selectedArticle || !selectedLocation || !quantity) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    // Find applicable pricing rules
    const applicableRules = pricingRules.filter((rule: any) => {
      // Check if rule applies to selected article
      if (rule.article?.id !== selectedArticle) return false;

      // Check if rule applies to selected variant (if any)
      if (selectedVariant && rule.articleVariant?.id !== selectedVariant)
        return false;

      // Check if rule applies to selected partner (if any)
      if (
        selectedPartner &&
        selectedPartner !== 'none' &&
        rule.partner?.id !== selectedPartner
      )
        return false;

      // Check if rule applies to selected location (if any)
      if (rule.location && rule.location.id !== selectedLocation) return false;

      return true;
    });

    // Calculate base price from the most specific rule
    let basePrice = 0;
    const rulesApplied: Array<any> = [];

    if (applicableRules.length > 0) {
      // Use the first applicable rule as base price
      const baseRule = applicableRules[0];
      basePrice = baseRule.price;
      rulesApplied.push({
        id: baseRule.id,
        type: 'Base Price',
        description: `Precio base para ${selectedArticleData?.name}`,
        adjustment: basePrice,
      });
    } else {
      // Default price if no rules found
      basePrice = 5000; // $50.00 in cents
      rulesApplied.push({
        id: 'default',
        type: 'Default Price',
        description: 'Precio base por defecto',
        adjustment: basePrice,
      });
    }

    // TODO: Get location multipliers from GraphQL
    const locationMultipliers: { [key: string]: number } = {
      '1': 1.0, // La Habana
      '2': 1.2, // Santiago de Cuba
      '3': 1.1, // Camagüey
      '4': 1.15, // Holguín
      '5': 1.05, // Santa Clara
    };

    const locationMultiplier = locationMultipliers[selectedLocation] || 1.0;
    const locationAdjustment = basePrice * (locationMultiplier - 1);

    if (locationMultiplier !== 1.0) {
      rulesApplied.push({
        id: 'location',
        type: 'Location Adjustment',
        description: `Ajuste por ubicación (${locations.find((l) => l.id === selectedLocation)?.name})`,
        adjustment: locationAdjustment,
      });
    }

    // TODO: Get partner discounts from GraphQL
    const partnerDiscounts: { [key: string]: number } = {
      // Partner-specific discounts would come from the database
    };

    const partnerDiscount =
      selectedPartner && selectedPartner !== 'none'
        ? partnerDiscounts[selectedPartner] || 0
        : 0;
    const discountAmount =
      (basePrice + locationAdjustment) * (partnerDiscount / 100);

    if (partnerDiscount > 0) {
      rulesApplied.push({
        id: 'partner',
        type: 'Partner Discount',
        description: `Descuento de socio (${partnerDiscount}%)`,
        adjustment: -discountAmount,
      });
    }

    // Calculate final price
    const subtotal = basePrice + locationAdjustment - discountAmount;
    const finalPrice = subtotal * quantity;

    setCalculation({
      basePrice,
      locationMultiplier,
      partnerDiscount,
      finalPrice,
      rulesApplied,
    });

    toast.success('Precio calculado exitosamente');
  };

  const resetCalculation = () => {
    setSelectedArticle('');
    setSelectedVariant('');
    setSelectedPartner('');
    setSelectedLocation('');
    setQuantity(1);
    setCalculation(null);
  };

  const exportCalculation = () => {
    if (!calculation) return;

    const exportData = {
      article: selectedArticleData?.name,
      variant: variants.find((v: any) => v.id === selectedVariant)?.name,
      partner:
        selectedPartner && selectedPartner !== 'none'
          ? partners.find((p: any) => p.id === selectedPartner)?.name
          : null,
      location: locations.find((l) => l.id === selectedLocation)?.name,
      quantity,
      calculation,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pricing-calculation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Cálculo exportado exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/pricing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Precios
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Calculadora de Precios
          </h1>
          <p className="text-muted-foreground">
            Calcula precios dinámicos basados en las reglas configuradas
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Parámetros de Cálculo
              </CardTitle>
              <CardDescription>
                Configura los parámetros para el cálculo de precio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="article">Artículo *</Label>
                  <Select
                    value={selectedArticle}
                    onValueChange={setSelectedArticle}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar artículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {articles.map((article: any) => (
                        <SelectItem key={article.id} value={article.id}>
                          {article.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="variant">Variante</Label>
                  <Select
                    value={selectedVariant}
                    onValueChange={setSelectedVariant}
                    disabled={!selectedArticle || variants.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar variante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        Sin variante específica
                      </SelectItem>
                      {variants.map((variant: any) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location">Ubicación *</Label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="partner">Socio</Label>
                  <Select
                    value={selectedPartner}
                    onValueChange={setSelectedPartner}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar socio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin socio específico</SelectItem>
                      {partners.map((partner: any) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="quantity">Cantidad *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  placeholder="1"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePrice} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Precio
                </Button>
                <Button variant="outline" onClick={resetCalculation}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {calculation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Resultado del Cálculo
                </CardTitle>
                <CardDescription>
                  Desglose detallado del precio calculado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rules Applied */}
                <div>
                  <Label className="text-sm font-medium">
                    Reglas Aplicadas
                  </Label>
                  <div className="space-y-2 mt-2">
                    {calculation.rulesApplied.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">{rule.type}</div>
                          <div className="text-xs text-muted-foreground">
                            {rule.description}
                          </div>
                        </div>
                        <Badge
                          variant={
                            rule.adjustment < 0 ? 'destructive' : 'default'
                          }
                        >
                          {rule.adjustment < 0 ? '-' : ''}$
                          {Math.abs(rule.adjustment / 100).toFixed(2)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Price */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Precio Final</div>
                      <div className="text-sm text-muted-foreground">
                        {quantity > 1 && `${quantity} unidades`}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${(calculation.finalPrice / 100).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={exportCalculation}
                    className="flex-1"
                  >
                    Exportar Cálculo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Selección</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Artículo</Label>
                <div className="text-sm">
                  {selectedArticleData?.name || 'No seleccionado'}
                </div>
              </div>

              {selectedVariant && (
                <div>
                  <Label className="text-sm font-medium">Variante</Label>
                  <div className="text-sm">
                    {variants.find((v: any) => v.id === selectedVariant)?.name}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Ubicación</Label>
                <div className="text-sm">
                  {locations.find((l) => l.id === selectedLocation)?.name ||
                    'No seleccionado'}
                </div>
              </div>

              {selectedPartner && selectedPartner !== 'none' && (
                <div>
                  <Label className="text-sm font-medium">Socio</Label>
                  <div className="text-sm">
                    {partners.find((p: any) => p.id === selectedPartner)?.name}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Cantidad</Label>
                <div className="text-sm">{quantity} unidad(es)</div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{articles.length}</div>
                  <div className="text-xs text-muted-foreground">
                    Artículos disponibles
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">
                    {pricingRules.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reglas de precio activas
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{partners.length}</div>
                  <div className="text-xs text-muted-foreground">
                    Socios registrados
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{locations.length}</div>
                  <div className="text-xs text-muted-foreground">
                    Ubicaciones disponibles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Ayuda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Selecciona un artículo y ubicación para calcular el precio
              </p>
              <p>• Las variantes son opcionales y pueden afectar el precio</p>
              <p>• Los socios pueden tener descuentos especiales</p>
              <p>• Los precios pueden variar por ubicación geográfica</p>
              <p>• Puedes exportar el cálculo para tus registros</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
