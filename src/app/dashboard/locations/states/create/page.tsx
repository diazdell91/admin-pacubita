'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Map, Save, X } from 'lucide-react';

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
// import { CREATE_STATE } from '@/lib/graphql/generated';
// import { GET_COUNTRIES } from '@/lib/graphql/generated';
// import { useCountriesQuery, CREATE_STATE } from '@/lib/graphql/generated';
import Link from 'next/link';

export default function CreateStatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCountryId = searchParams.get('countryId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    countryId: preselectedCountryId || '',
  });

  // TODO: Implement with real GraphQL queries from codegen
  // const { data: countriesData } = useQuery(GET_COUNTRIES, {
  //   variables: { input: {} },
  // });
  // const [createState] = useMutation(CREATE_STATE, {
  //   onCompleted: () => {
  //     router.push('/dashboard/locations/states');
  //   },
  // });

  const countriesData = null;
  const createState = () => Promise.resolve().then(() => router.push('/dashboard/locations/states'));

  const countries: any[] = [];
  const selectedCountry = countries.find(
    (c: any) => c.id === formData.countryId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createState({
        variables: {
          input: {
            name: formData.name,
            id: formData.id || undefined,
            countryId: formData.countryId,
          },
        },
      });
    } catch (createError) {
      console.error('Error creating state:', createError);
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
            <Link href="/dashboard/locations/states">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Estados/Provincias
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Crear Estado/Provincia
            </h1>
            <p className="text-muted-foreground">
              {selectedCountry
                ? `Agrega un nuevo estado/provincia para ${selectedCountry.name}`
                : 'Agrega un nuevo estado/provincia al sistema'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100">
              <Map className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Información del Estado/Provincia</CardTitle>
              <CardDescription>
                Completa la información básica del estado o provincia
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="countryId">País *</Label>
                <Select
                  value={formData.countryId}
                  onValueChange={(value) =>
                    handleInputChange('countryId', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country: any) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Estado/Provincia *</Label>
                <Input
                  id="name"
                  placeholder="Ej: La Habana, Pinar del Río"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID del Estado/Provincia (opcional)</Label>
                <Input
                  id="id"
                  placeholder="Ej: la-habana, pinar-del-rio"
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
                disabled={isSubmitting || !formData.name || !formData.countryId}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creando...' : 'Crear Estado/Provincia'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/locations/states">
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
              ¿Qué sucede después de crear el estado/provincia?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Podrás agregar ciudades para este estado/provincia</li>
              <li>• Estará disponible en los filtros de ubicación</li>
              <li>• Se habilitará la gestión de municipios y barrios</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Ejemplos por país:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Cuba: La Habana, Pinar del Río, Matanzas</li>
              <li>• México: Ciudad de México, Jalisco, Nuevo León</li>
              <li>• España: Madrid, Barcelona, Valencia</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
