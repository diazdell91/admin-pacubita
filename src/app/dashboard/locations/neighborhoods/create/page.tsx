'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Home, Save, X } from 'lucide-react';

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
// import { CREATE_NEIGHBORHOOD } from '@/lib/graphql/mutations/locations';
// import { GET_MUNICIPALITIES } from '@/lib/graphql/queries/locations';
import { useMockMunicipalitiesQuery, useMockCreateNeighborhoodMutation } from '@/lib/mock-data';
import Link from 'next/link';

export default function CreateNeighborhoodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedMunicipalityId = searchParams.get('municipalityId');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    municipalityId: preselectedMunicipalityId || '',
  });

  // TODO: Replace with GraphQL when backend is ready
  const { data: municipalitiesData } = useMockMunicipalitiesQuery();

  // TODO: Replace with GraphQL when backend is ready
  const [createNeighborhood] = useMockCreateNeighborhoodMutation();

  const municipalities =
    municipalitiesData?.municipalities?.data || [];
  const selectedMunicipality = municipalities.find(
    (m: any) => m.id === formData.municipalityId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with real mutation when backend is ready
      await createNeighborhood();
      router.push('/dashboard/locations/neighborhoods');
    } catch (createError) {
      console.error('Error creating neighborhood:', createError);
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
            <Link href="/dashboard/locations/neighborhoods">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Barrios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Crear Barrio</h1>
            <p className="text-muted-foreground">
              {selectedMunicipality
                ? `Agrega un nuevo barrio para ${selectedMunicipality.name}`
                : 'Agrega un nuevo barrio al sistema'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100">
              <Home className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle>Información del Barrio</CardTitle>
              <CardDescription>
                Completa la información básica del barrio
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="municipalityId">Municipio *</Label>
                <Select
                  value={formData.municipalityId}
                  onValueChange={(value) =>
                    handleInputChange('municipalityId', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar municipio" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((municipality: any) => (
                      <SelectItem key={municipality.id} value={municipality.id}>
                        {municipality.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Barrio *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Vedado, Miramar, Nuevo Vedado"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID del Barrio (opcional)</Label>
                <Input
                  id="id"
                  placeholder="Ej: vedado, miramar, nuevo-vedado"
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
                  isSubmitting || !formData.name || !formData.municipalityId
                }
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creando...' : 'Crear Barrio'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/locations/neighborhoods">
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
              ¿Qué sucede después de crear el barrio?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>
                • El barrio estará disponible para asignación de direcciones
              </li>
              <li>• Se habilitará la entrega precisa en esta zona</li>
              <li>• Estará visible en todos los filtros de ubicación</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">
              Ejemplos de barrios famosos en Cuba:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• La Habana: Vedado, Miramar, Habana Vieja, Centro</li>
              <li>• Santiago: Vista Alegre, Sueño, Los Olmos</li>
              <li>• Matanzas: Pueblo Nuevo, Versalles, Playa</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Consejos:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Usa nombres oficiales o reconocidos localmente</li>
              <li>• Evita abreviaciones confusas</li>
              <li>• Considera la geografía y límites naturales</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
