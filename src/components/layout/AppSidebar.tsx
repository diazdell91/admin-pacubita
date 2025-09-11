'use client';

import * as React from 'react';
import {
  Package2,
  Users,
  ShoppingBag,
  Calculator,
  MapPin,
  BarChart3,
  Settings,
  Home,
  FileText,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Pedidos',
      url: '/dashboard/orders',
      icon: Package2,
      items: [
        {
          title: 'Todos los pedidos',
          url: '/dashboard/orders',
        },
        {
          title: 'Crear pedido',
          url: '/dashboard/orders/create',
        },
        {
          title: 'Entregas',
          url: '/dashboard/orders?type=delivery',
        },
        {
          title: 'Empaquetado',
          url: '/dashboard/orders?type=wrapping',
        },
      ],
    },
    {
      title: 'Usuarios',
      url: '/dashboard/users',
      icon: Users,
      items: [
        {
          title: 'Todos los usuarios',
          url: '/dashboard/users',
        },
        {
          title: 'Clientes',
          url: '/dashboard/users/clients',
        },
        {
          title: 'Conductores',
          url: '/dashboard/users/drivers',
        },
        {
          title: 'Socios',
          url: '/dashboard/users/partners',
        },
        {
          title: 'Personal',
          url: '/dashboard/users/staff',
        },
      ],
    },
    {
      title: 'Artículos',
      url: '/dashboard/articles',
      icon: ShoppingBag,
      items: [
        {
          title: 'Catálogo',
          url: '/dashboard/articles',
        },
        {
          title: 'Crear artículo',
          url: '/dashboard/articles/create',
        },
        {
          title: 'Variantes',
          url: '/dashboard/articles/variants',
        },
        {
          title: 'Tipos de entrega',
          url: '/dashboard/articles/delivery-types',
        },
      ],
    },
    {
      title: 'Precios',
      url: '/dashboard/pricing',
      icon: Calculator,
      items: [
        {
          title: 'Reglas de precios',
          url: '/dashboard/pricing',
        },
        {
          title: 'Calculadora',
          url: '/dashboard/pricing/calculator',
        },
        {
          title: 'Crear regla',
          url: '/dashboard/pricing/create',
        },
      ],
    },
    {
      title: 'Ubicaciones',
      url: '/dashboard/locations',
      icon: MapPin,
      items: [
        {
          title: 'Vista general',
          url: '/dashboard/locations',
        },
        {
          title: 'Países',
          url: '/dashboard/locations/countries',
        },
        {
          title: 'Estados/Provincias',
          url: '/dashboard/locations/states',
        },
        {
          title: 'Ciudades',
          url: '/dashboard/locations/cities',
        },
        {
          title: 'Municipios',
          url: '/dashboard/locations/municipalities',
        },
        {
          title: 'Barrios',
          url: '/dashboard/locations/neighborhoods',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Analíticas',
      url: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      title: 'Reportes',
      url: '/dashboard/reports',
      icon: FileText,
    },
    {
      title: 'Configuración',
      url: '/dashboard/settings',
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Pa Cubita Admin</span>
            <span className="truncate text-xs text-muted-foreground">
              Sistema de Gestión
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible asChild defaultOpen={false} className="group/collapsible">
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
