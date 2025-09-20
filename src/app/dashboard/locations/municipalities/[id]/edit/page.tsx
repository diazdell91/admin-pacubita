'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { LoadingPage } from '@/components/common/LoadingSpinner';
import { useMunicipalityQuery, useProvincesQuery, useUpdateMunicipalityMutation } from '@/lib/graphql';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EditMunicipalityPage() {
  const router = useRouter();
  const params = useParams();
  const municipalityId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    provinceId: '',
  });

  // Load municipality data
  const { data: municipalityData, loading: municipalityLoading, error: municipalityError } = useMunicipalityQuery({
    variables: {
      input: { id: municipalityId }
    },
    skip: !municipalityId
  });

  // Load provinces
  const { data: provincesData, loading: provincesLoading } = useProvincesQuery({
    variables: {
      input: {
        pagination: { page: 1, size: 100 }
      }
    }
  });

  // Update municipality mutation
  const [updateMunicipalityMutation, { loading: isUpdating }] = useUpdateMunicipalityMutation({
    onCompleted: () => {
      toast.success('Municipio actualizado exitosamente');
      router.push('/dashboard/locations/municipalities');
    },
    onError: (error) => {
      console.error('Error updating municipality:', error);
      toast.error('Error al actualizar el municipio');
    }
  });

  const municipality = municipalityData?.municipality?.municipality;
  const provinces = provincesData?.provinces?.provinces || [];
  const selectedProvince = provinces.find((p: any) => p.id === formData.provinceId);

  // Populate form when municipality data loads
  useEffect(() => {
    if (municipality) {
      setFormData({
        name: municipality.name || '',
        provinceId: municipality.province?.id || ''
      });
    }
  }, [municipality]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateMunicipalityMutation({
        variables: {
          input: {
            id: municipalityId,
            name: formData.name,
            provinceId: formData.provinceId
          }
        }
      });
    } catch (error) {
      console.error('Error updating municipality:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (municipalityLoading || provincesLoading) {
    return <LoadingPage />;
  }

  if (municipalityError || !municipality) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el municipio</p>
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
            <Link href="/dashboard/locations/municipalities">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Municipios
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editar Municipio</h1>
            <p className="text-muted-foreground">
              Modifica la información de {municipality.name}
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
                Actualiza la información básica del municipio
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
                  onValueChange={(value) => handleInputChange('provinceId', value)}
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
            </div>

            <div className="flex items-center gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting || isUpdating || !formData.name || !formData.provinceId}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting || isUpdating ? 'Guardando...' : 'Guardar Cambios'}
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

      {/* Municipality Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Municipio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">ID:</span>
              <p className="text-muted-foreground">{municipality.id}</p>
            </div>
            <div>
              <span className="font-medium">Provincia actual:</span>
              <p className="text-muted-foreground">{municipality.province?.name}</p>
            </div>
            <div>
              <span className="font-medium">Estado/País:</span>
              <p className="text-muted-foreground">{municipality.province?.state?.name}</p>
            </div>
            <div>
              <span className="font-medium">País:</span>
              <p className="text-muted-foreground">{municipality.province?.state?.country?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}