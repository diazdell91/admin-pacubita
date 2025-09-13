'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, MapPin, Save, X } from 'lucide-react';

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
// import { CREATE_MUNICIPALITY } from '@/lib/graphql/mutations/locations';
// import { GET_PROVINCES } from '@/lib/graphql/queries/locations';
import { useStatesQuery} from "@/lib/graphql/generated";
import Link from 'next/link';

export default function CreateMunicipalityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedProvinceId = searchParams.get('provinceId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    provinceId: preselectedProvinceId || '',
  });

  // TODO: Replace with GraphQL when backend is ready
  const { data: provincesData } = useStatesQuery();

  // TODO: Replace with GraphQL when backend is ready
  // TODO: Add proper mutation

  const provinces = provincesData?.states?.states || [];
  const selectedProvince = provinces.find(
    (p: any) => p.id === formData.provinceId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with real mutation when backend is ready
      await createMunicipality();
      router.push('/dashboard/locations/municipalities');
    } catch (createError) {
      console.error('Error creating municipality:', createError);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/locations/municipalities">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Municipios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Crear Municipio
            </h1>
            <p className="text-muted-foreground">
              {selectedProvince
                ? `Agrega un nuevo municipio para ${selectedProvince.name}`
                : 'Agrega un nuevo municipio al sistema'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-100">
              <MapPin className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Información del Municipio</CardTitle>
              <CardDescription>
                Completa la información básica del municipio
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="provinceId">Provincia *</Label>
                <Select
                  value={formData.provinceId}
                  onValueChange={(value) =>
                    handleInputChange('provinceId', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province: any) => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Municipio *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Plaza, Vedado, Miramar"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID del Municipio (opcional)</Label>
                <Input
                  id="id"
                  placeholder="Ej: plaza, vedado, miramar"
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

            <div className="flex items-center gap-4 pt-6">
              <Button
                type="submit"
                disabled={
                  isSubmitting || !formData.name || !formData.provinceId
                }
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creando...' : 'Crear Municipio'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/locations/municipalities">
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
              ¿Qué sucede después de crear el municipio?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Podrás agregar barrios para este municipio</li>
              <li>• Estará disponible en los filtros de ubicación</li>
              <li>• Se habilitará la gestión detallada de direcciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">
              Ejemplos de municipios en Cuba:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• La Habana: Plaza, Centro Habana, Habana Vieja</li>
              <li>• Santiago: Santiago de Cuba, Palma Soriano</li>
              <li>• Matanzas: Matanzas, Cárdenas, Varadero</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
