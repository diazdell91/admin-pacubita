'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Mail,
  Filter,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  relatedEntity?: {
    type: 'order' | 'user' | 'partner' | 'delivery';
    id: string;
    name: string;
  };
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertCircle;
    case 'error':
      return AlertCircle;
    case 'info':
    default:
      return Info;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with real data from GraphQL/API
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Nueva orden recibida',
      message: 'Se ha recibido una nueva orden #ORD-001 del cliente Juan Pérez.',
      type: 'info',
      isRead: false,
      createdAt: new Date('2024-11-10T10:30:00Z'),
      relatedEntity: {
        type: 'order',
        id: 'ORD-001',
        name: 'Orden #ORD-001',
      },
    },
    {
      id: '2',
      title: 'Entrega completada',
      message: 'La orden #ORD-045 ha sido entregada exitosamente.',
      type: 'success',
      isRead: true,
      createdAt: new Date('2024-11-10T09:15:00Z'),
      relatedEntity: {
        type: 'order',
        id: 'ORD-045',
        name: 'Orden #ORD-045',
      },
    },
    {
      id: '3',
      title: 'Problema con entrega',
      message: 'No se pudo completar la entrega de la orden #ORD-032. El cliente no estaba disponible.',
      type: 'warning',
      isRead: false,
      createdAt: new Date('2024-11-10T08:45:00Z'),
      relatedEntity: {
        type: 'delivery',
        id: 'DEL-032',
        name: 'Entrega #DEL-032',
      },
    },
    {
      id: '4',
      title: 'Nuevo conductor registrado',
      message: 'El conductor Carlos Martínez se ha registrado en la plataforma.',
      type: 'info',
      isRead: true,
      createdAt: new Date('2024-11-09T16:20:00Z'),
      relatedEntity: {
        type: 'user',
        id: 'USR-123',
        name: 'Carlos Martínez',
      },
    },
    {
      id: '5',
      title: 'Error en el sistema',
      message: 'Se ha detectado un error en el procesamiento de pagos. Revisar urgentemente.',
      type: 'error',
      isRead: false,
      createdAt: new Date('2024-11-09T14:10:00Z'),
    },
    {
      id: '6',
      title: 'Mantenimiento programado',
      message: 'El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 4:00 AM.',
      type: 'info',
      isRead: true,
      createdAt: new Date('2024-11-08T12:00:00Z'),
    },
  ];

  // Filter notifications
  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'unread' && !notification.isRead) ||
      (statusFilter === 'read' && notification.isRead);

    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Marking as read:', notificationId);
  };

  const handleMarkAsUnread = (notificationId: string) => {
    console.log('Marking as unread:', notificationId);
  };

  const handleDelete = (notificationId: string) => {
    console.log('Deleting notification:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all as read');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;

    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notificaciones"
        description={`Gestiona todas tus notificaciones del sistema${unreadCount > 0 ? ` (${unreadCount} sin leer)` : ''}`}
        actionLabel={unreadCount > 0 ? "Marcar todas como leídas" : undefined}
        onAction={unreadCount > 0 ? handleMarkAllAsRead : undefined}
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar notificaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="info">Información</SelectItem>
                  <SelectItem value="success">Éxito</SelectItem>
                  <SelectItem value="warning">Advertencia</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="unread">Sin leer</SelectItem>
                  <SelectItem value="read">Leídas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay notificaciones que coincidan con los filtros.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = getTypeIcon(notification.type);

            return (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${getTypeBadge(notification.type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.createdAt)}
                          </span>

                          {notification.relatedEntity && (
                            <Badge variant="outline" className="text-xs">
                              {notification.relatedEntity.type}: {notification.relatedEntity.name}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {notification.isRead ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsUnread(notification.id)}
                              title="Marcar como no leído"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Stats */}
      {filteredNotifications.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Mostrando {filteredNotifications.length} de {mockNotifications.length} notificaciones
              </span>
              <span>
                {unreadCount} sin leer
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}