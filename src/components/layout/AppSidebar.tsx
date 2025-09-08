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
  Truck,
  CreditCard,
  FileText,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'Pedidos',
      url: '/orders',
      icon: Package2,
      items: [
        {
          title: 'Todos los pedidos',
          url: '/orders',
        },
        {
          title: 'Crear pedido',
          url: '/orders/create',
        },
        {
          title: 'Entregas',
          url: '/orders?type=delivery',
        },
        {
          title: 'Empaquetado',
          url: '/orders?type=wrapping',
        },
      ],
    },
    {
      title: 'Usuarios',
      url: '/users',
      icon: Users,
      items: [
        {
          title: 'Todos los usuarios',
          url: '/users',
        },
        {
          title: 'Clientes',
          url: '/users/clients',
        },
        {
          title: 'Conductores',
          url: '/users/drivers',
        },
        {
          title: 'Socios',
          url: '/users/partners',
        },
        {
          title: 'Personal',
          url: '/users/staff',
        },
      ],
    },
    {
      title: 'Artículos',
      url: '/articles',
      icon: ShoppingBag,
      items: [
        {
          title: 'Catálogo',
          url: '/articles',
        },
        {
          title: 'Crear artículo',
          url: '/articles/create',
        },
        {
          title: 'Variantes',
          url: '/articles/variants',
        },
        {
          title: 'Tipos de entrega',
          url: '/articles/delivery-types',
        },
      ],
    },
    {
      title: 'Precios',
      url: '/pricing',
      icon: Calculator,
      items: [
        {
          title: 'Reglas de precios',
          url: '/pricing',
        },
        {
          title: 'Calculadora',
          url: '/pricing/calculator',
        },
        {
          title: 'Crear regla',
          url: '/pricing/create',
        },
      ],
    },
    {
      title: 'Ubicaciones',
      url: '/locations',
      icon: MapPin,
      items: [
        {
          title: 'Vista general',
          url: '/locations',
        },
        {
          title: 'Países',
          url: '/locations/countries',
        },
        {
          title: 'Estados/Provincias',
          url: '/locations/states',
        },
        {
          title: 'Ciudades',
          url: '/locations/cities',
        },
        {
          title: 'Municipios',
          url: '/locations/municipalities',
        },
        {
          title: 'Barrios',
          url: '/locations/neighborhoods',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Analíticas',
      url: '/analytics',
      icon: BarChart3,
    },
    {
      title: 'Reportes',
      url: '/reports',
      icon: FileText,
    },
    {
      title: 'Configuración',
      url: '/settings',
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
            <span className="truncate font-semibold">Cubita Admin</span>
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
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.items && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items && (
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
                    )}
                    {!item.items && (
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
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