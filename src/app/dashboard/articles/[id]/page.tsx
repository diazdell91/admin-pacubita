'use client';

import { useQuery } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useGetArticleQuery } from '@/lib/graphql/generated';
import {
  ArrowLeft,
  Edit,
  Package,
  Image as ImageIcon,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
  Plus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { toast } from 'sonner';

interface Article {
  id: string;
  name: string;
  description?: string;
  imagePath?: string;
  isEnabled: boolean;
  variants?: Array<{
    id: string;
    name: string;
    isEnabled: boolean;
  }>;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const { loading, error, data, refetch } = useGetArticleQuery({
    variables: {
      input: {
        id: articleId,
      },
    },
    errorPolicy: 'all',
  });

  const article: Article | undefined = data?.article;

  const handleEdit = () => {
    router.push(`/dashboard/articles/${articleId}/edit`);
  };

  const handleToggleStatus = async () => {
    if (!article) return;
    try {
      // TODO: Implement toggle status mutation
      toast.success(
        article.isEnabled ? 'Artículo deshabilitado' : 'Artículo habilitado'
      );
      await refetch();
    } catch {
      toast.error('Error al cambiar el estado del artículo');
    }
  };

  const handleManageVariants = () => {
    router.push(`/dashboard/articles/${articleId}/variants`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el artículo</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Artículos
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {article.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={article.isEnabled ? 'default' : 'secondary'}
                className={
                  article.isEnabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {article.isEnabled ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {article.isEnabled ? (
                  <>
                    <ToggleLeft className="mr-2 h-4 w-4" />
                    Deshabilitar
                  </>
                ) : (
                  <>
                    <ToggleRight className="mr-2 h-4 w-4" />
                    Habilitar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleManageVariants}>
                <Package className="mr-2 h-4 w-4" />
                Gestionar variantes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Información del Artículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nombre
                </label>
                <p className="text-sm">{article.name}</p>
              </div>
              {article.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Descripción
                  </label>
                  <p className="text-sm whitespace-pre-wrap">
                    {article.description}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Estado
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${article.isEnabled ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span className="text-sm">
                    {article.isEnabled ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Variantes
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManageVariants}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Gestionar
                </Button>
              </div>
              <CardDescription>
                Variantes configuradas para este artículo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {article.variants && article.variants.length > 0 ? (
                <div className="grid gap-3">
                  {article.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{variant.name}</p>
                      </div>
                      <Badge
                        variant={variant.isEnabled ? 'default' : 'secondary'}
                        className={
                          variant.isEnabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {variant.isEnabled ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay variantes configuradas</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={handleManageVariants}
                  >
                    Crear primera variante
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Imagen del Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              {article.imagePath ? (
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={article.imagePath}
                    alt={article.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Sin imagen</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Variantes</span>
                <span className="font-medium">
                  {article.variants?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Variantes activas
                </span>
                <span className="font-medium">
                  {article.variants?.filter((v) => v.isEnabled).length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Imagen</span>
                <span className="font-medium">
                  {article.imagePath ? 'Sí' : 'No'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
