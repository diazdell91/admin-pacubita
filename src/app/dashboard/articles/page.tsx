'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useArticlesQuery, type Article } from '@/lib/graphql/generated';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Download,
  Search,
  Package,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  const { loading, error, data, refetch } = useArticlesQuery({
    variables: {
      input: {
        _: undefined, // ArticlesInput only has _ field
      },
    },
    errorPolicy: 'all',
  });

  const articles = data?.articles?.articles || [];
  const totalArticles = articles.length;

  const handleCreateArticle = () => {
    router.push('/dashboard/articles/create');
  };

  const handleViewArticle = (article: Article) => {
    router.push(`/dashboard/articles/${article.id}`);
  };

  const handleEditArticle = (article: Article) => {
    router.push(`/dashboard/articles/${article.id}/edit`);
  };

  const handleToggleStatus = async (article: Article) => {
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

  const handleExport = async () => {
    try {
      toast.success('Exportando artículos...');
    } catch {
      toast.error('Error al exportar artículos');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar los artículos</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  // Statistics
  const enabledArticles = articles.filter(
    (article: Article) => article.isEnabled
  ).length;
  const articlesWithVariants = articles.filter(
    (article: Article) => article.variants && article.variants.length > 0
  ).length;
  const articlesWithImages = articles.filter(
    (article: Article) => article.imagePath
  ).length;

  const columns = [
    {
      key: 'name' as keyof Article,
      label: 'Artículo',
      sortable: true,
      render: (_value: any, article: Article) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg border bg-gray-50 flex items-center justify-center">
            {article.imagePath ? (
              <img
                src={article.imagePath}
                alt={article.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <Link
              href={`/dashboard/articles/${article.id}`}
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {article.name}
            </Link>
            {article.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {article.description}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'variants' as keyof Article,
      label: 'Variantes',
      render: (_value: any, article: Article) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {article.variants?.length || 0} variante(s)
          </div>
          {article.variants && article.variants.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.variants.slice(0, 2).map((variant) => (
                <Badge
                  key={variant.id}
                  variant="outline"
                  className={`text-xs ${variant.isEnabled ? 'text-green-700 border-green-200' : 'text-gray-500 border-gray-200'}`}
                >
                  {variant.name}
                </Badge>
              ))}
              {article.variants.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{article.variants.length - 2} más
                </Badge>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'isEnabled' as keyof Article,
      label: 'Estado',
      render: (value: any, article: Article) => (
        <div className="flex items-center space-x-2">
          <Badge
            variant={value ? 'default' : 'secondary'}
            className={
              value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }
          >
            {value ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      ),
    },
    {
      key: 'imagePath' as keyof Article,
      label: 'Imagen',
      render: (value: any) => (
        <div className="flex items-center justify-center">
          {value ? (
            <ImageIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ImageIcon className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'actions' as keyof Article,
      label: 'Acciones',
      render: (_value: any, article: Article) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleViewArticle(article)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditArticle(article)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStatus(article)}>
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
            <DropdownMenuItem>Gestionar variantes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Artículos"
        description="Administra el catálogo de productos del sistema"
        actionLabel="Crear Artículo"
        onAction={handleCreateArticle}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </PageHeader>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Artículos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {enabledArticles} activos de {totalArticles} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Variantes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesWithVariants}</div>
            <p className="text-xs text-muted-foreground">
              Artículos con variantes configuradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Imágenes</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesWithImages}</div>
            <p className="text-xs text-muted-foreground">
              Artículos con imagen del producto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habilitados</CardTitle>
            <ToggleRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledArticles}</div>
            <p className="text-xs text-muted-foreground">
              {totalArticles > 0
                ? Math.round((enabledArticles / totalArticles) * 100)
                : 0}
              % del total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="enabled">Activos</SelectItem>
                  <SelectItem value="disabled">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white">
        <DataTable
          data={articles}
          columns={columns}
          searchPlaceholder="Buscar artículos..."
          onRowClick={handleViewArticle}
          pageSize={pageSize}
          totalItems={totalArticles}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
