'use client';

import { useQuery, useMutation } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  UserCheck,
  UserX,
  Building,
  Truck,
  Car,
  MapPin,
  Crown,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GET_USER } from '@/lib/graphql/queries/users';
import { UPDATE_USER_STATUS } from '@/lib/graphql/mutations/users';
import Link from 'next/link';

const USER_TYPE_CONFIG = {
  CLIENT: {
    label: 'Cliente',
    icon: User,
    color: 'text-blue-600 bg-blue-100',
    description: 'Usuario cliente del sistema',
  },
  DRIVER: {
    label: 'Conductor',
    icon: Truck,
    color: 'text-green-600 bg-green-100',
    description: 'Conductor de vehículos',
  },
  PARTNER: {
    label: 'Socio',
    icon: Shield,
    color: 'text-purple-600 bg-purple-100',
    description: 'Socio comercial',
  },
  STAFF: {
    label: 'Personal',
    icon: Crown,
    color: 'text-orange-600 bg-orange-100',
    description: 'Miembro del personal',
  },
};

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { input: { id: userId } },
    fetchPolicy: 'cache-and-network',
  });

  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS, {
    onCompleted: () => {
      setIsEditingStatus(false);
      setNewStatus('');
      setStatusNotes('');
      refetch();
    },
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !data?.user) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error al cargar el usuario
          </h1>
          <p className="text-muted-foreground">
            {error?.message || 'Usuario no encontrado'}
          </p>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const user = data.user.user;
  const userTypeConfig =
    USER_TYPE_CONFIG[user.type as keyof typeof USER_TYPE_CONFIG];
  const TypeIcon = userTypeConfig?.icon || User;

  const handleStatusUpdate = async () => {
    if (!newStatus) return;

    await updateUserStatus({
      variables: {
        input: {
          id: userId,
          isEnabled: newStatus === 'enabled',
          notes: statusNotes,
        },
      },
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-CU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const renderRoleSpecificInfo = () => {
    switch (user.type) {
      case 'DRIVER':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Información del Vehículo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.vehicle ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">
                        Marca y Modelo
                      </Label>
                      <div className="text-sm">
                        {user.vehicle.make} {user.vehicle.model}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Año</Label>
                      <div className="text-sm">{user.vehicle.year}</div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Placa</Label>
                      <div className="text-sm font-mono">
                        {user.vehicle.plate}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Color</Label>
                      <div className="text-sm">{user.vehicle.color}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Car className="h-8 w-8 mx-auto mb-2" />
                  <p>No hay vehículo asignado</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Asignar Vehículo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'PARTNER':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Información Comercial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Empresa</Label>
                  <div className="text-sm">
                    {user.partner ? user.partner.name : 'Sin empresa asignada'}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo de Socio</Label>
                  <Badge variant="outline" className="mt-1">
                    Socio Comercial
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'STAFF':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Información del Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Rol</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {user.role === 'admin' ? (
                      <Badge
                        variant="default"
                        className="bg-purple-100 text-purple-800"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Administrador
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <User className="h-3 w-3 mr-1" />
                        Staff
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Departamento</Label>
                  <div className="text-sm">
                    {user.partner
                      ? user.partner.name
                      : 'Sin departamento asignado'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">
              {userTypeConfig?.description} • Registrado el{' '}
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/users/${userId}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Usuario
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* User Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {user.isEnabled ? (
                  <UserCheck className="h-5 w-5 text-green-600" />
                ) : (
                  <UserX className="h-5 w-5 text-red-600" />
                )}
                Estado del Usuario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${user.isEnabled ? 'bg-green-100' : 'bg-red-100'}`}
                  >
                    {user.isEnabled ? (
                      <UserCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <UserX className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {user.isEnabled
                        ? 'Usuario Activo'
                        : 'Usuario Desactivado'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Último cambio: {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
                {!isEditingStatus ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditingStatus(true);
                      setNewStatus(user.isEnabled ? 'enabled' : 'disabled');
                    }}
                  >
                    Cambiar Estado
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingStatus(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleStatusUpdate}
                      disabled={!newStatus}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditingStatus && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div>
                    <Label>Nuevo Estado</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Activo</SelectItem>
                        <SelectItem value="disabled">Desactivado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notas (opcional)</Label>
                    <Textarea
                      value={statusNotes}
                      onChange={(e) => setStatusNotes(e.target.value)}
                      placeholder="Agregue notas sobre este cambio..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{user.email}</span>
                    {user.isEmailVerified ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Sin verificar
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Teléfono</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{user.phone}</span>
                    {user.isPhoneVerified ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Sin verificar
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!user.isEmailVerified && (
                  <Button variant="outline" size="sm">
                    Enviar Verificación Email
                  </Button>
                )}
                {!user.isPhoneVerified && (
                  <Button variant="outline" size="sm">
                    Enviar Verificación SMS
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Information */}
          {renderRoleSpecificInfo()}

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Historial de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      Usuario registrado
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>

                {user.isEmailVerified && (
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Email verificado
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Email confirmado exitosamente
                      </div>
                    </div>
                  </div>
                )}

                {user.isPhoneVerified && (
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Teléfono verificado
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Número telefónico confirmado
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Profile */}
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/avatars/user-${user.id}.png`} />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <TypeIcon className="h-4 w-4" />
                {userTypeConfig?.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Miembro desde {new Date(user.createdAt).getFullYear()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-center">
                <Badge
                  variant={user.isEnabled ? 'default' : 'secondary'}
                  className={userTypeConfig?.color}
                >
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {userTypeConfig?.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Partner Information */}
          {user.partner && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Empresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="font-medium">{user.partner.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Empresa asociada
                  </div>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link href={`/dashboard/partners/${user.partner.id}`}>
                      Ver Empresa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href={`/dashboard/users/${userId}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Usuario
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Phone className="h-4 w-4 mr-2" />
                Llamar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
