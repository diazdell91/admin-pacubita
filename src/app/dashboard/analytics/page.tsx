'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  Clock,
  Truck,
  MapPin,
  BarChart3,
  PieChart,
  Download,
} from 'lucide-react';

// Mock data - in real implementation this would come from GraphQL
const mockAnalyticsData = {
  overview: {
    totalOrders: 2547,
    totalRevenue: 125430,
    activeUsers: 1834,
    completionRate: 94.2,
    averageDeliveryTime: 45, // minutes
    trends: {
      orders: { value: 12.5, direction: 'up' },
      revenue: { value: 8.3, direction: 'up' },
      users: { value: -2.1, direction: 'down' },
      deliveryTime: { value: 5.2, direction: 'down' },
    },
  },
  ordersByStatus: [
    { status: 'DELIVERED', count: 1892, percentage: 74.3 },
    { status: 'IN_TRANSIT', count: 234, percentage: 9.2 },
    { status: 'PENDING', count: 198, percentage: 7.8 },
    { status: 'CONFIRMED', count: 156, percentage: 6.1 },
    { status: 'CANCELLED', count: 67, percentage: 2.6 },
  ],
  revenueByMonth: [
    { month: 'Ene', revenue: 18500, orders: 245 },
    { month: 'Feb', revenue: 22300, orders: 298 },
    { month: 'Mar', revenue: 25100, orders: 334 },
    { month: 'Abr', revenue: 28900, orders: 387 },
    { month: 'May', revenue: 31200, orders: 421 },
    { month: 'Jun', revenue: 29800, orders: 398 },
  ],
  topPartners: [
    {
      id: '1',
      name: 'Express Delivery',
      orders: 543,
      revenue: 28400,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Fast Logistics',
      orders: 421,
      revenue: 22100,
      rating: 4.6,
    },
    { id: '3', name: 'City Courier', orders: 334, revenue: 18900, rating: 4.7 },
    {
      id: '4',
      name: 'Metro Transport',
      orders: 287,
      revenue: 15600,
      rating: 4.5,
    },
  ],
  deliveryAreas: [
    { area: 'La Habana', orders: 1234, percentage: 48.5 },
    { area: 'Santiago', orders: 456, percentage: 17.9 },
    { area: 'Camagüey', orders: 234, percentage: 9.2 },
    { area: 'Holguín', orders: 198, percentage: 7.8 },
    { area: 'Otros', orders: 425, percentage: 16.6 },
  ],
};

const timeRanges = [
  { value: '7d', label: 'Últimos 7 días' },
  { value: '30d', label: 'Últimos 30 días' },
  { value: '90d', label: 'Últimos 3 meses' },
  { value: '1y', label: 'Último año' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleExport = () => {
    // Export functionality
    console.log('Exporting analytics data...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'IN_TRANSIT':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-purple-100 text-purple-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analíticas</h1>
          <p className="text-muted-foreground">
            Panel de análisis y métricas del sistema
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pedidos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAnalyticsData.overview.totalOrders.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />+
                  {mockAnalyticsData.overview.trends.orders.value}% vs mes
                  anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Totales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(mockAnalyticsData.overview.totalRevenue)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />+
                  {mockAnalyticsData.overview.trends.revenue.value}% vs mes
                  anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuarios Activos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAnalyticsData.overview.activeUsers.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                  {mockAnalyticsData.overview.trends.users.value}% vs mes
                  anterior
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tiempo Promedio
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAnalyticsData.overview.averageDeliveryTime}min
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 h-3 w-3 text-green-600" />-
                  {mockAnalyticsData.overview.trends.deliveryTime.value}% mejora
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Estados de Pedidos
                </CardTitle>
                <CardDescription>
                  Distribución por estado actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnalyticsData.ordersByStatus.map((item) => (
                    <div
                      key={item.status}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <span className="text-sm">{item.count} pedidos</span>
                      </div>
                      <span className="text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Partners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Mejores Socios
                </CardTitle>
                <CardDescription>Socios con mejor rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnalyticsData.topPartners.map((partner, index) => (
                    <div
                      key={partner.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {partner.orders} pedidos • ⭐ {partner.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(partner.revenue)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Áreas de Entrega
              </CardTitle>
              <CardDescription>
                Distribución geográfica de pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockAnalyticsData.deliveryAreas.map((area) => (
                  <div key={area.area} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{area.area}</span>
                      <Badge variant="secondary">{area.percentage}%</Badge>
                    </div>
                    <div className="text-2xl font-bold">{area.orders}</div>
                    <div className="text-xs text-muted-foreground">pedidos</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Pedidos</CardTitle>
              <CardDescription>
                Tendencias y patrones de pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="mx-auto h-12 w-12 mb-4" />
                <p>Gráficos de pedidos por implementar</p>
                <p className="text-sm">
                  Incluirá tendencias temporales, tipos de servicio, y análisis
                  comparativo
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ingresos</CardTitle>
              <CardDescription>
                Tendencias financieras y rentabilidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="mx-auto h-12 w-12 mb-4" />
                <p>Gráficos de ingresos por implementar</p>
                <p className="text-sm">
                  Incluirá ingresos por socio, comisiones, y proyecciones
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
              <CardDescription>KPIs operacionales y eficiencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="mx-auto h-12 w-12 mb-4" />
                <p>Métricas de rendimiento por implementar</p>
                <p className="text-sm">
                  Incluirá tiempos de entrega, satisfacción del cliente, y
                  eficiencia operacional
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
