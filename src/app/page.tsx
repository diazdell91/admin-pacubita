import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general del sistema de gestión de entregas
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Totales
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
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
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +12.5% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +15.3% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conductores Activos
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +7 desde ayer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
            <CardDescription>
              Últimos pedidos registrados en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 'ORD-001', client: 'María García', status: 'delivered', time: '2 min' },
              { id: 'ORD-002', client: 'Juan Pérez', status: 'in_transit', time: '15 min' },
              { id: 'ORD-003', client: 'Ana López', status: 'pending', time: '32 min' },
              { id: 'ORD-004', client: 'Carlos Ruiz', status: 'confirmed', time: '1 hora' },
            ].map((order) => (
              <div key={order.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {order.status === 'delivered' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {order.status === 'in_transit' && (
                    <Truck className="h-4 w-4 text-blue-500" />
                  )}
                  {order.status === 'pending' && (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  {order.status === 'confirmed' && (
                    <AlertCircle className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.client}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'in_transit' ? 'secondary' :
                      order.status === 'pending' ? 'outline' : 'destructive'
                    }
                  >
                    {order.status === 'delivered' && 'Entregado'}
                    {order.status === 'in_transit' && 'En tránsito'}
                    {order.status === 'pending' && 'Pendiente'}
                    {order.status === 'confirmed' && 'Confirmado'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">hace {order.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Estado de Pedidos</CardTitle>
            <CardDescription>
              Distribución actual de estados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Entregados</span>
              </div>
              <span className="text-sm font-medium">892</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <span className="text-sm">En tránsito</span>
              </div>
              <span className="text-sm font-medium">127</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Pendientes</span>
              </div>
              <span className="text-sm font-medium">89</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Problemas</span>
              </div>
              <span className="text-sm font-medium">12</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
