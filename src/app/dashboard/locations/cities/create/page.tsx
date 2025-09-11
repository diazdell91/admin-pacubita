'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Building2, Save, X, Plus, Trash2 } from 'lucide-react';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// TODO: Replace with GraphQL when backend is ready
// import { CREATE_CITY } from '@/lib/graphql/mutations/locations';
// import { GET_COUNTRIES, GET_STATES } from '@/lib/graphql/queries/locations';
import { 
  useMockCountriesQuery, 
  useMockStatesQuery, 
  useMockCreateCityMutation 
} from '@/lib/mock-data';
import Link from 'next/link';

export default function CreateCityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedStateId = searchParams.get('stateId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    stateId: preselectedStateId || '',
    zipCodes: [''],
  });

  // TODO: Replace with GraphQL when backend is ready
  const { data: countriesData } = useMockCountriesQuery();
  const { data: statesData } = useMockStatesQuery();

  // TODO: Replace with GraphQL when backend is ready
  const [createCity] = useMockCreateCityMutation();

  const countries = countriesData?.countries?.data || [];
  const states = statesData?.states?.data || [];
  const selectedState = states.find((s: any) => s.id === formData.stateId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const zipCodes = formData.zipCodes.filter((code) => code.trim() !== '');

      // TODO: Replace with real mutation when backend is ready
      await createCity();
      router.push('/dashboard/locations/cities');
    } catch (createError) {
      console.error('Error creating city:', createError);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleZipCodeChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      zipCodes: prev.zipCodes.map((code, i) => (i === index ? value : code)),
    }));
  };

  const addZipCode = () => {
    setFormData((prev) => ({
      ...prev,
      zipCodes: [...prev.zipCodes, ''],
    }));
  };

  const removeZipCode = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      zipCodes: prev.zipCodes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/locations/cities">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ciudades
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Crear Ciudad</h1>
            <p className="text-muted-foreground">
              {selectedState
                ? `Agrega una nueva ciudad para ${selectedState.name}`
                : 'Agrega una nueva ciudad al sistema'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Información de la Ciudad</CardTitle>
              <CardDescription>
                Completa la información básica de la ciudad
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stateId">Estado/Provincia *</Label>
                <Select
                  value={formData.stateId}
                  onValueChange={(value) => handleInputChange('stateId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado/provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state: any) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Ciudad *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Habana, Matanzas, Santiago"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID de la Ciudad (opcional)</Label>
                <Input
                  id="id"
                  placeholder="Ej: habana, matanzas, santiago"
                  value={formData.id}
                  onChange={(e) =>
                    handleInputChange(
                      'id',
                      e.target.value.toLowerCase().replace(/\s+/g, '-')
                    )
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Si no se especifica, se generará automáticamente
                </p>
              </div>
            </div>

            {/* Zip Codes Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Códigos Postales (opcional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addZipCode}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Código
                </Button>
              </div>

              <div className="space-y-2">
                {formData.zipCodes.map((zipCode, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Ej: 10400, 11300"
                      value={zipCode}
                      onChange={(e) =>
                        handleZipCodeChange(index, e.target.value)
                      }
                      className="flex-1"
                    />
                    {formData.zipCodes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeZipCode(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.stateId}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creando...' : 'Crear Ciudad'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/locations/cities">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información Adicional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">
              ¿Qué sucede después de crear la ciudad?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• La ciudad estará disponible en los sistemas de entregas</li>
              <li>• Se podrán asociar códigos postales específicos</li>
              <li>• Estará disponible para la gestión de ubicaciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Sobre los códigos postales:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Puedes agregar múltiples códigos postales por ciudad</li>
              <li>
                • Son opcionales pero ayudan con la precisión de las entregas
              </li>
              <li>• Formato numérico estándar (ej: 10400, 11300)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
