import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  AlertTriangle, 
  XCircle,
  User,
  UserCheck,
  UserX
} from 'lucide-react';

// Order Status Types based on GraphQL schema
export type OrderStatus = 
  | 'PENDING'
  | 'FAILED' 
  | 'CONFIRMED'
  | 'ACCEPTED'
  | 'PICKED_UP'
  | 'DROPPED_OFF'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'banned';

const orderStatusConfig: Record<OrderStatus, {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}> = {
  PENDING: {
    label: 'Pendiente',
    variant: 'outline',
    icon: Clock,
    className: 'text-yellow-600 border-yellow-200 bg-yellow-50'
  },
  FAILED: {
    label: 'Fallido',
    variant: 'destructive',
    icon: XCircle,
  },
  CONFIRMED: {
    label: 'Confirmado',
    variant: 'secondary',
    icon: CheckCircle,
    className: 'text-blue-600 border-blue-200 bg-blue-50'
  },
  ACCEPTED: {
    label: 'Aceptado',
    variant: 'secondary',
    icon: UserCheck,
    className: 'text-purple-600 border-purple-200 bg-purple-50'
  },
  PICKED_UP: {
    label: 'Recogido',
    variant: 'secondary',
    icon: Package,
    className: 'text-indigo-600 border-indigo-200 bg-indigo-50'
  },
  DROPPED_OFF: {
    label: 'Depositado',
    variant: 'secondary',
    icon: Truck,
    className: 'text-orange-600 border-orange-200 bg-orange-50'
  },
  SHIPPED: {
    label: 'Enviado',
    variant: 'secondary',
    icon: Truck,
    className: 'text-cyan-600 border-cyan-200 bg-cyan-50'
  },
  DELIVERED: {
    label: 'Entregado',
    variant: 'default',
    icon: CheckCircle,
    className: 'text-green-600 border-green-200 bg-green-50'
  },
  CANCELLED: {
    label: 'Cancelado',
    variant: 'destructive',
    icon: XCircle,
  }
};

const userStatusConfig: Record<UserStatus, {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}> = {
  active: {
    label: 'Activo',
    variant: 'default',
    icon: UserCheck,
    className: 'text-green-600 border-green-200 bg-green-50'
  },
  inactive: {
    label: 'Inactivo',
    variant: 'outline',
    icon: User,
    className: 'text-gray-600 border-gray-200 bg-gray-50'
  },
  pending: {
    label: 'Pendiente',
    variant: 'outline',
    icon: Clock,
    className: 'text-yellow-600 border-yellow-200 bg-yellow-50'
  },
  banned: {
    label: 'Suspendido',
    variant: 'destructive',
    icon: UserX,
  }
};

interface StatusBadgeProps {
  status: OrderStatus | UserStatus;
  showIcon?: boolean;
  size?: 'sm' | 'default';
}

export function StatusBadge({ status, showIcon = true, size = 'default' }: StatusBadgeProps) {
  // Check if it's an order status or user status
  const isOrderStatus = status in orderStatusConfig;
  const config = isOrderStatus 
    ? orderStatusConfig[status as OrderStatus]
    : userStatusConfig[status as UserStatus];

  if (!config) {
    return (
      <Badge variant="outline" className={size === 'sm' ? 'text-xs' : ''}>
        {status}
      </Badge>
    );
  }

  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={cn(
        'inline-flex items-center gap-1',
        size === 'sm' && 'text-xs px-2 py-0.5',
        config.className
      )}
    >
      {showIcon && <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />}
      {config.label}
    </Badge>
  );
}

// Specific components for different status types
export function OrderStatusBadge({ 
  status, 
  showIcon = true, 
  size = 'default' 
}: { 
  status: OrderStatus; 
  showIcon?: boolean; 
  size?: 'sm' | 'default';
}) {
  return <StatusBadge status={status} showIcon={showIcon} size={size} />;
}

export function UserStatusBadge({ 
  status, 
  showIcon = true, 
  size = 'default' 
}: { 
  status: UserStatus; 
  showIcon?: boolean; 
  size?: 'sm' | 'default';
}) {
  return <StatusBadge status={status} showIcon={showIcon} size={size} />;
}