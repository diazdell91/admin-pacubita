'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { usePartnersQuery } from '@/lib/graphql/generated';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Truck,
  Crown,
  Building,
  Car,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// TODO: Add proper user queries and mutations to generated file
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

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEnabled: boolean;
  partnerId?: string;

  // Driver specific
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehiclePlate?: string;
  vehicleColor?: string;

  // Staff specific
  role?: string;
  department?: string;

  // Password change
  newPassword?: string;
  confirmNewPassword?: string;

  notes?: string;
}

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isEnabled: true,
    notes: '',
  });

  // TODO: Replace with proper query - const { data: userData, loading: userLoading } = useQuery(GET_USER, {
  const { data: userData, loading: userLoading } = { data: null, loading: false };

  const { data: partnersData } = usePartnersQuery({
    variables: { input: {} },
  });

  // TODO: Replace with proper mutation
  const updateUser = () => Promise.resolve();
  const updating = false;

  useEffect(() => {
    if (userData?.user?.user) {
      const user = userData.user.user;
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isEnabled: user.isEnabled,
        partnerId: user.partner?.id,

        // Driver specific
        vehicleMake: user.vehicle?.make,
        vehicleModel: user.vehicle?.model,
        vehicleYear: user.vehicle?.year?.toString(),
        vehiclePlate: user.vehicle?.plate,
        vehicleColor: user.vehicle?.color,

        // Staff specific
        role: user.role,
        notes: user.notes || '',
      });
    }
  }, [userData]);

  const updateFormData = (updates: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  if (userLoading || !userData?.user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const user = userData.user.user;
  const userTypeConfig =
    USER_TYPE_CONFIG[user.type as keyof typeof USER_TYPE_CONFIG];
  const TypeIcon = userTypeConfig?.icon || User;

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      return false;
    }

    if (isChangingPassword) {
      if (!formData.newPassword || formData.newPassword.length < 8) {
        return false;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const userInput: any = {
        id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        isEnabled: formData.isEnabled,
        partnerId: formData.partnerId,
      };

      // Add password if changing
      if (isChangingPassword && formData.newPassword) {
        userInput.password = formData.newPassword;
      }

      // Add type-specific fields
      if (user.type === 'DRIVER' && formData.vehicleMake) {
        userInput.vehicle = {
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          year: parseInt(formData.vehicleYear || '2020'),
          plate: formData.vehiclePlate,
          color: formData.vehicleColor,
        };
      }

      if (user.type === 'STAFF') {
        userInput.role = formData.role || 'staff';
        userInput.department = formData.department;
      }

      if (formData.notes) {
        userInput.notes = formData.notes;
      }

      await updateUser({ variables: { input: userInput } });
    } catch (updateError) {
      console.error('Error updating user:', updateError);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderTypeSpecificFields = () => {
    switch (user.type) {
      case 'DRIVER':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Información del Vehículo
              </CardTitle>
              <CardDescription>
                Datos del vehículo asignado al conductor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="vehicleMake">Marca</Label>
                  <Input
                    id="vehicleMake"
                    value={formData.vehicleMake || ''}
                    onChange={(e) =>
                      updateFormData({ vehicleMake: e.target.value })
                    }
                    placeholder="Toyota, Honda, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Modelo</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel || ''}
                    onChange={(e) =>
                      updateFormData({ vehicleModel: e.target.value })
                    }
                    placeholder="Corolla, Civic, etc."
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="vehicleYear">Año</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    min="1990"
                    max="2030"
                    value={formData.vehicleYear || ''}
                    onChange={(e) =>
                      updateFormData({ vehicleYear: e.target.value })
                    }
                    placeholder="2020"
                  />
                </div>
                <div>
                  <Label htmlFor="vehiclePlate">Placa</Label>
                  <Input
                    id="vehiclePlate"
                    value={formData.vehiclePlate || ''}
                    onChange={(e) =>
                      updateFormData({
                        vehiclePlate: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="ABC-123"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleColor">Color</Label>
                  <Input
                    id="vehicleColor"
                    value={formData.vehicleColor || ''}
                    onChange={(e) =>
                      updateFormData({ vehicleColor: e.target.value })
                    }
                    placeholder="Blanco, Negro, etc."
                  />
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
              <CardDescription>
                Rol y departamento del miembro del personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={formData.role || ''}
                  onValueChange={(value) => updateFormData({ role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Input
                  id="department"
                  value={formData.department || ''}
                  onChange={(e) =>
                    updateFormData({ department: e.target.value })
                  }
                  placeholder="Operaciones, Soporte, etc."
                />
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/users/${userId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Perfil
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Usuario</h1>
          <p className="text-muted-foreground">
            Actualiza la información de {user.firstName} {user.lastName}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TypeIcon className="h-4 w-4" />
                Información Básica
              </CardTitle>
              <CardDescription>
                Datos personales del {userTypeConfig?.label.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      updateFormData({ firstName: e.target.value })
                    }
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      updateFormData({ lastName: e.target.value })
                    }
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    placeholder="usuario@ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    placeholder="+53 5 1234-5678"
                  />
                </div>
              </div>

              {partnersData?.partners?.partners && (
                <div>
                  <Label htmlFor="partnerId">Empresa</Label>
                  <Select
                    value={formData.partnerId || ''}
                    onValueChange={(value) =>
                      updateFormData({ partnerId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin empresa</SelectItem>
                      {partnersData.partners.partners.map((partner: any) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>
                Actualiza la contraseña del usuario (opcional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="changePassword"
                  checked={isChangingPassword}
                  onCheckedChange={setIsChangingPassword}
                />
                <Label htmlFor="changePassword">Cambiar contraseña</Label>
              </div>

              {isChangingPassword && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={formData.newPassword || ''}
                          onChange={(e) =>
                            updateFormData({ newPassword: e.target.value })
                          }
                          placeholder="Mínimo 8 caracteres"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmNewPassword">
                        Confirmar Nueva Contraseña
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmNewPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmNewPassword || ''}
                          onChange={(e) =>
                            updateFormData({
                              confirmNewPassword: e.target.value,
                            })
                          }
                          placeholder="Confirmar contraseña"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {formData.newPassword !== formData.confirmNewPassword &&
                    formData.confirmNewPassword && (
                      <div className="text-sm text-red-600">
                        Las contraseñas no coinciden
                      </div>
                    )}

                  {formData.newPassword && formData.newPassword.length < 8 && (
                    <div className="text-sm text-red-600">
                      La contraseña debe tener al menos 8 caracteres
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Type-specific fields */}
          {renderTypeSpecificFields()}

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
              <CardDescription>
                Configuración y notas adicionales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isEnabled"
                  checked={formData.isEnabled}
                  onCheckedChange={(checked) =>
                    updateFormData({ isEnabled: checked })
                  }
                />
                <Label htmlFor="isEnabled">Usuario activo</Label>
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ''}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  placeholder="Notas adicionales sobre el usuario..."
                  rows={3}
                />
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
                {formData.firstName} {formData.lastName}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <TypeIcon className="h-4 w-4" />
                {userTypeConfig?.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge
                  variant={formData.isEnabled ? 'default' : 'secondary'}
                  className={userTypeConfig?.color}
                >
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {userTypeConfig?.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!validateForm() || updating}
                  className="w-full"
                >
                  {updating ? (
                    'Guardando...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/users/${userId}`}>Cancelar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Ayuda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Los campos marcados con (*) son obligatorios</p>
              <p>• Solo cambia la contraseña si es necesario</p>
              <p>• Los cambios se aplicarán inmediatamente</p>
              <p>
                • El usuario será notificado por email de los cambios
                importantes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
