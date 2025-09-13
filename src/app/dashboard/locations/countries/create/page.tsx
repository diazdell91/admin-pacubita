'use client';

import { useState } from 'react';
// TODO: Replace with GraphQL when backend is ready
// import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// TODO: Replace with GraphQL when backend is ready
// import { CREATE_COUNTRY } from '@/lib/graphql/mutations/locations';
import {  } from "@/lib/graphql/generated";
import Link from 'next/link';

export default function CreateCountryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
  });

  // TODO: Replace with GraphQL when backend is ready
  // TODO: Add proper mutation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with real mutation when backend is ready
      await createCountry();
      router.push('/dashboard/locations/countries');
    } catch (createError) {
      console.error('Error creating country:', createError);
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
            <Link href="/dashboard/locations/countries">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Países
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Crear País</h1>
            <p className="text-muted-foreground">
              Agrega un nuevo país al sistema de ubicaciones
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Información del País</CardTitle>
              <CardDescription>
                Completa la información básica del país
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del País *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Cuba, México, España"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">ID del País (opcional)</Label>
                <Input
                  id="id"
                  placeholder="Ej: cuba, mexico, espana"
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
              <Button type="submit" disabled={isSubmitting || !formData.name}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Creando...' : 'Crear País'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/locations/countries">
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
              ¿Qué sucede después de crear el país?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Podrás agregar estados y provincias para este país</li>
              <li>• El país estará disponible en los filtros de ubicación</li>
              <li>• Se habilitará la gestión de ciudades y municipios</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Consejos para el ID del país:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Usa nombres cortos y descriptivos</li>
              <li>• Evita espacios y caracteres especiales</li>
              <li>• Ejemplo: "cuba" para Cuba, "mexico" para México</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
