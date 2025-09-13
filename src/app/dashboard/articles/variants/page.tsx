'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useArticlesQuery } from '@/lib/graphql/generated';
import {
  Eye,
  Edit,
  MoreHorizontal,
  Search,
  Package,
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ArticleVariant {
  id: string;
  name: string;
  isEnabled: boolean;
  article: {
    id: string;
    name: string;
  };
}

interface Article {
  id: string;
  name: string;
  variants?: Array<{
    id: string;
    name: string;
    isEnabled: boolean;
  }>;
}

export default function ArticleVariantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  const { loading, error, data, refetch } = useArticlesQuery({
    variables: {
      input: {
        _: null, // Required placeholder field
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const articles = data?.articles?.articles || [];

  // Flatten variants from all articles
  const variants: ArticleVariant[] = articles.flatMap((article) =>
    (article.variants || []).map((variant) => ({
      ...variant,
      article: {
        id: article.id,
        name: article.name,
      },
    }))
  );

  const filteredVariants = variants.filter((variant) => {
    const matchesSearch =
      !searchTerm ||
      variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variant.article.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'enabled' && variant.isEnabled) ||
      (statusFilter === 'disabled' && !variant.isEnabled);

    return matchesSearch && matchesStatus;
  });

  const handleCreateVariant = () => {
    router.push('/dashboard/articles/variants/create');
  };

  const handleViewVariant = (variant: ArticleVariant) => {
    router.push(`/dashboard/articles/${variant.article.id}`);
  };

  const handleEditVariant = (variant: ArticleVariant) => {
    router.push(`/dashboard/articles/variants/${variant.id}/edit`);
  };

  const handleToggleStatus = async (variant: ArticleVariant) => {
    try {
      // TODO: Implement toggle variant status mutation
      toast.success(
        variant.isEnabled ? 'Variante deshabilitada' : 'Variante habilitada'
      );
      await refetch();
    } catch {
      toast.error('Error al cambiar el estado de la variante');
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
        <p className="text-red-600 mb-4">Error al cargar las variantes</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  // Statistics
  const totalVariants = variants.length;
  const enabledVariants = variants.filter((v) => v.isEnabled).length;

  const columns = [
    {
      key: 'name' as keyof ArticleVariant,
      label: 'Variante',
      sortable: true,
      render: (value: any, variant: ArticleVariant) => (
        <div className="space-y-1">
          <Link
            href={`/dashboard/articles/${variant.article.id}`}
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </Link>
          <p className="text-sm text-muted-foreground">
            Artículo: {variant.article.name}
          </p>
        </div>
      ),
    },
    {
      key: 'article' as keyof ArticleVariant,
      label: 'Artículo',
      render: (value: any, variant: ArticleVariant) => (
        <Link
          href={`/dashboard/articles/${variant.article.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {variant.article.name}
        </Link>
      ),
    },
    {
      key: 'isEnabled' as keyof ArticleVariant,
      label: 'Estado',
      render: (value: any) => (
        <Badge
          variant={value ? 'default' : 'secondary'}
          className={
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }
        >
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      key: 'actions' as keyof ArticleVariant,
      label: 'Acciones',
      render: (value: any, variant: ArticleVariant) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleViewVariant(variant)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver artículo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditVariant(variant)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar variante
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStatus(variant)}>
              {variant.isEnabled ? (
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
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Variantes de Artículos"
        description="Gestiona las variantes de todos los artículos del sistema"
        actionLabel="Crear Variante"
        onAction={handleCreateVariant}
      />

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{totalVariants}</p>
                <p className="text-sm text-muted-foreground">
                  Total de variantes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ToggleRight className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{enabledVariants}</p>
                <p className="text-sm text-muted-foreground">
                  Variantes activas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ToggleLeft className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-2xl font-bold">
                  {totalVariants - enabledVariants}
                </p>
                <p className="text-sm text-muted-foreground">
                  Variantes inactivas
                </p>
              </div>
            </div>
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
                  placeholder="Buscar variantes por nombre o artículo..."
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
          data={filteredVariants as any}
          columns={columns as any}
          searchPlaceholder="Buscar variantes..."
          onRowClick={handleViewVariant as any}
          pageSize={pageSize}
          totalItems={filteredVariants.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
