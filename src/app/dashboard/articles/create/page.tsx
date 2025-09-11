'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useCreateArticleMutation } from '@/lib/graphql/generated';
import {
  ArrowLeft,
  Save,
  Package,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface ArticleFormData {
  name: string;
  description: string;
  imagePath?: string;
  isEnabled: boolean;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormData>({
    name: '',
    description: '',
    isEnabled: true,
  });
  const [isUploading, setIsUploading] = useState(false);

  const [createArticle, { loading: creating }] = useCreateArticleMutation({
    onCompleted: (data) => {
      toast.success('Artículo creado exitosamente');
      router.push(`/dashboard/articles/${data.createArticle.id}`);
    },
    onError: (error) => {
      toast.error('Error al crear el artículo');
      console.error('Create article error:', error);
    },
  });

  const updateFormData = (updates: Partial<ArticleFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateForm = () => {
    return formData.name.trim() !== '' && formData.description.trim() !== '';
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error('La imagen debe ser menor a 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // For now, we'll create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      updateFormData({ imagePath: imageUrl });

      // TODO: Implement actual file upload to cloud storage
      toast.success('Imagen cargada correctamente');
    } catch {
      toast.error('Error al cargar la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await createArticle({
        variables: {
          input: {
            name: formData.name.trim(),
            description: formData.description.trim(),
            imagePath: formData.imagePath,
            isEnabled: formData.isEnabled,
          },
        },
      });
    } catch {
      // Error handling is done in the mutation onError callback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Artículos
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Crear Nuevo Artículo
          </h1>
          <p className="text-muted-foreground">
            Agrega un nuevo producto al catálogo del sistema
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Información Básica
              </CardTitle>
              <CardDescription>
                Información principal del artículo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Artículo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  placeholder="Ej: Smartphone Samsung Galaxy S23"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData({ description: e.target.value })
                  }
                  placeholder="Describe el artículo detalladamente..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isEnabled"
                  checked={formData.isEnabled}
                  onCheckedChange={(checked) =>
                    updateFormData({ isEnabled: checked })
                  }
                />
                <Label htmlFor="isEnabled">Artículo activo</Label>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Imagen del Producto
              </CardTitle>
              <CardDescription>
                Sube una imagen representativa del artículo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400"
                >
                  {formData.imagePath ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.imagePath}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        <p className="text-white text-sm">
                          Hacer clic para cambiar
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Hacer clic para subir
                        </span>{' '}
                        o arrastrar y soltar
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG o JPEG (MAX. 5MB)
                      </p>
                    </div>
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>

              {isUploading && (
                <div className="text-center text-sm text-muted-foreground">
                  Cargando imagen...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.name && (
                <div>
                  <Label className="text-sm font-medium">Nombre</Label>
                  <div className="text-sm">{formData.name}</div>
                </div>
              )}

              {formData.description && (
                <div>
                  <Label className="text-sm font-medium">Descripción</Label>
                  <div className="text-sm line-clamp-3">
                    {formData.description}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Estado</Label>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${formData.isEnabled ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span className="text-sm">
                    {formData.isEnabled ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Imagen</Label>
                <div className="text-sm">
                  {formData.imagePath ? 'Cargada' : 'Sin imagen'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!validateForm() || creating || isUploading}
                  className="w-full"
                >
                  {creating ? (
                    'Creando...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Crear Artículo
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/articles">Cancelar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Ayuda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Nombre y descripción son campos obligatorios</p>
              <p>• La imagen debe ser menor a 5MB</p>
              <p>• Puedes gestionar variantes después de crear el artículo</p>
              <p>
                • Los artículos inactivos no aparecen en el catálogo público
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
