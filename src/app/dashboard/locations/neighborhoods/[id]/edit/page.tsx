'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { LoadingPage } from '@/components/common/LoadingSpinner';
import { useNeighborhoodQuery, useMunicipalitiesQuery, useUpdateNeighborhoodMutation } from '@/lib/graphql';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EditNeighborhoodPage() {
  const router = useRouter();
  const params = useParams();
  const neighborhoodId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    municipalityId: '',
  });

  // Load neighborhood data
  const { data: neighborhoodData, loading: neighborhoodLoading, error: neighborhoodError } = useNeighborhoodQuery({
    variables: {
      input: { id: neighborhoodId }
    },
    skip: !neighborhoodId
  });

  // Load municipalities
  const { data: municipalitiesData, loading: municipalitiesLoading } = useMunicipalitiesQuery({
    variables: {
      input: {
        pagination: { page: 1, size: 100 }
      }
    }
  });

  // Update neighborhood mutation
  const [updateNeighborhoodMutation, { loading: isUpdating }] = useUpdateNeighborhoodMutation({
    onCompleted: () => {
      toast.success('Barrio actualizado exitosamente');
      router.push('/dashboard/locations/neighborhoods');
    },
    onError: (error) => {
      console.error('Error updating neighborhood:', error);
      toast.error('Error al actualizar el barrio');
    }
  });

  const neighborhood = neighborhoodData?.neighborhood?.neighborhood;
  const municipalities = municipalitiesData?.municipalities?.municipalities || [];
  const selectedMunicipality = municipalities.find((m: any) => m.id === formData.municipalityId);

  // Populate form when neighborhood data loads
  useEffect(() => {
    if (neighborhood) {
      setFormData({
        name: neighborhood.name || '',
        municipalityId: neighborhood.municipality?.id || ''
      });
    }
  }, [neighborhood]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateNeighborhoodMutation({
        variables: {
          input: {
            id: neighborhoodId,
            name: formData.name,
            municipalityId: formData.municipalityId
          }
        }
      });
    } catch (error) {
      console.error('Error updating neighborhood:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (neighborhoodLoading || municipalitiesLoading) {
    return <LoadingPage />;
  }

  if (neighborhoodError || !neighborhood) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el barrio</p>
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
            <Link href="/dashboard/locations/neighborhoods">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Barrios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Barrio</h1>
            <p className="text-muted-foreground">
              Modifica la información de {neighborhood.name}
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
                Actualiza la información básica del barrio
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
                  onValueChange={(value) => handleInputChange('municipalityId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar municipio" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((municipality: any) => (
                      <SelectItem key={municipality.id} value={municipality.id}>
                        {municipality.name} - {municipality.province?.name}
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
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting || isUpdating || !formData.name || !formData.municipalityId}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting || isUpdating ? 'Guardando...' : 'Guardar Cambios'}
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

      {/* Neighborhood Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Barrio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">ID:</span>
              <p className="text-muted-foreground">{neighborhood.id}</p>
            </div>
            <div>
              <span className="font-medium">Municipio actual:</span>
              <p className="text-muted-foreground">{neighborhood.municipality?.name}</p>
            </div>
            <div>
              <span className="font-medium">Provincia:</span>
              <p className="text-muted-foreground">{neighborhood.municipality?.province?.name}</p>
            </div>
            <div>
              <span className="font-medium">Estado:</span>
              <p className="text-muted-foreground">{neighborhood.municipality?.province?.state?.name}</p>
            </div>
            <div>
              <span className="font-medium">País:</span>
              <p className="text-muted-foreground">{neighborhood.municipality?.province?.state?.country?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}