'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { LoadingPage } from '@/components/common/LoadingSpinner';
import { useCityQuery, useStatesQuery, useUpdateCityMutation } from '@/lib/graphql';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EditCityPage() {
  const router = useRouter();
  const params = useParams();
  const cityId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    stateId: '',
    zipCodes: [''],
  });

  // Load city data
  const { data: cityData, loading: cityLoading, error: cityError } = useCityQuery({
    variables: {
      input: { id: cityId }
    },
    skip: !cityId
  });

  // Load states
  const { data: statesData, loading: statesLoading } = useStatesQuery({
    variables: {
      input: {}
    }
  });

  // Update city mutation
  const [updateCityMutation, { loading: isUpdating }] = useUpdateCityMutation({
    onCompleted: () => {
      toast.success('Ciudad actualizada exitosamente');
      router.push('/dashboard/locations/cities');
    },
    onError: (error) => {
      console.error('Error updating city:', error);
      toast.error('Error al actualizar la ciudad');
    }
  });

  const city = cityData?.city?.city;
  const states = statesData?.states?.states || [];
  const selectedState = states.find((s: any) => s.id === formData.stateId);

  // Populate form when city data loads
  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name || '',
        stateId: (city as any).state?.id || '',
        zipCodes: city.zipCodes && city.zipCodes.length > 0 ? [...city.zipCodes] : ['']
      });
    }
  }, [city]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const zipCodes = formData.zipCodes.filter((code) => code.trim() !== '');

      await updateCityMutation({
        variables: {
          input: {
            id: cityId,
            name: formData.name,
            stateId: formData.stateId,
            zipCodes: zipCodes.length > 0 ? zipCodes : undefined
          }
        }
      });
    } catch (error) {
      console.error('Error updating city:', error);
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

  if (cityLoading || statesLoading) {
    return <LoadingPage />;
  }

  if (cityError || !city) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar la ciudad</p>
        <Button onClick={() => router.back()}>Volver</Button>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Editar Ciudad</h1>
            <p className="text-muted-foreground">
              Modifica la información de {city.name}
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
                Actualiza la información básica de la ciudad
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
                disabled={isSubmitting || isUpdating || !formData.name || !formData.stateId}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting || isUpdating ? 'Guardando...' : 'Guardar Cambios'}
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

      {/* City Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información de la Ciudad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">ID:</span>
              <p className="text-muted-foreground">{city.id}</p>
            </div>
            <div>
              <span className="font-medium">Estado actual:</span>
              <p className="text-muted-foreground">{(city as any).state?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium">País:</span>
              <p className="text-muted-foreground">{(city as any).state?.country?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium">Códigos postales actuales:</span>
              <p className="text-muted-foreground">
                {city.zipCodes && city.zipCodes.length > 0
                  ? city.zipCodes.join(', ')
                  : 'Ninguno definido'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}