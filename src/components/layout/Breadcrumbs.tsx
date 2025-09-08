'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const routeLabels: Record<string, string> = {
  '': 'Dashboard',
  'orders': 'Pedidos',
  'users': 'Usuarios',
  'articles': 'Artículos',
  'pricing': 'Precios',
  'locations': 'Ubicaciones',
  'analytics': 'Analíticas',
  'reports': 'Reportes',
  'settings': 'Configuración',
  'create': 'Crear',
  'edit': 'Editar',
  'clients': 'Clientes',
  'drivers': 'Conductores',
  'partners': 'Socios',
  'staff': 'Personal',
  'variants': 'Variantes',
  'delivery-types': 'Tipos de entrega',
  'calculator': 'Calculadora',
  'countries': 'Países',
  'states': 'Estados/Provincias',
  'cities': 'Ciudades',
  'municipalities': 'Municipios',
  'neighborhoods': 'Barrios',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return (
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        <Home className="h-4 w-4" />
        <span className="font-medium text-foreground">Dashboard</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <div key={href} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}