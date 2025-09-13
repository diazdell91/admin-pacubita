'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
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
// TODO: Add proper user mutations to generated file - import { CREATE_USER }
// TODO: Add proper partner queries to generated file - import { GET_PARTNERS }
import Link from 'next/link';

const USER_TYPES = [
  {
    value: 'CLIENT',
    label: 'Cliente',
    icon: User,
    description: 'Usuario cliente del sistema',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    value: 'DRIVER',
    label: 'Conductor',
    icon: Truck,
    description: 'Conductor de vehículos',
    color: 'text-green-600 bg-green-100',
  },
  {
    value: 'PARTNER',
    label: 'Socio',
    icon: Shield,
    description: 'Socio comercial',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    value: 'STAFF',
    label: 'Personal',
    icon: Crown,
    description: 'Miembro del personal',
    color: 'text-orange-600 bg-orange-100',
  },
];

interface UserFormData {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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

  // Partner specific
  companyName?: string;
  companyType?: string;

  notes?: string;
}

export default function CreateUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedType = searchParams.get('type');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    type: preselectedType?.toUpperCase() || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isEnabled: true,
    notes: '',
  });

  const { data: partnersData } = useQuery(GET_PARTNERS, {
    variables: { input: {} },
  });

  // TODO: Replace with proper mutation - const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
  const [createUser, { loading: creating }] = [() => Promise.resolve(), { loading: false }];

  const updateFormData = (updates: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const selectedUserType = USER_TYPES.find(
    (type) => type.value === formData.type
  );
  const TypeIcon = selectedUserType?.icon || User;

  const validateForm = () => {
    if (
      !formData.type ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      return false;
    }

    if (formData.password.length < 8) {
      return false;
    }

    // Type-specific validations
    if (
      formData.type === 'DRIVER' &&
      (!formData.vehicleMake ||
        !formData.vehicleModel ||
        !formData.vehiclePlate)
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const userInput: any = {
        type: formData.type,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        isEnabled: formData.isEnabled,
        partnerId: formData.partnerId,
      };

      // Add type-specific fields
      if (formData.type === 'DRIVER' && formData.vehicleMake) {
        userInput.vehicle = {
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          year: parseInt(formData.vehicleYear || '2020'),
          plate: formData.vehiclePlate,
          color: formData.vehicleColor,
        };
      }

      if (formData.type === 'STAFF') {
        userInput.role = formData.role || 'staff';
        userInput.department = formData.department;
      }

      if (formData.notes) {
        userInput.notes = formData.notes;
      }

      await createUser({ variables: { input: userInput } });
    } catch (createError) {
      console.error('Error creating user:', createError);
    }
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
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

      case 'PARTNER':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Información Comercial
              </CardTitle>
              <CardDescription>
                Datos de la empresa o sociedad comercial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input
                  id="companyName"
                  value={formData.companyName || ''}
                  onChange={(e) =>
                    updateFormData({ companyName: e.target.value })
                  }
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <Label htmlFor="companyType">Tipo de Empresa</Label>
                <Select
                  value={formData.companyType || ''}
                  onValueChange={(value) =>
                    updateFormData({ companyType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistics">Logística</SelectItem>
                    <SelectItem value="retail">Comercio</SelectItem>
                    <SelectItem value="services">Servicios</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
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
          <Link href="/dashboard/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Usuarios
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Crear Nuevo Usuario
          </h1>
          <p className="text-muted-foreground">
            Completa la información para crear un nuevo usuario del sistema
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* User Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Usuario</CardTitle>
              <CardDescription>
                Selecciona el tipo de usuario que deseas crear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {USER_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.value;

                  return (
                    <div
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => updateFormData({ type: type.value })}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${type.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          {formData.type && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TypeIcon className="h-4 w-4" />
                  Información Básica
                </CardTitle>
                <CardDescription>
                  Datos personales del {selectedUserType?.label.toLowerCase()}
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
                      onChange={(e) =>
                        updateFormData({ email: e.target.value })
                      }
                      placeholder="usuario@ejemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        updateFormData({ phone: e.target.value })
                      }
                      placeholder="+53 5 1234-5678"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="password">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) =>
                          updateFormData({ password: e.target.value })
                        }
                        placeholder="Mínimo 8 caracteres"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirmar Contraseña *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          updateFormData({ confirmPassword: e.target.value })
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

                {formData.password !== formData.confirmPassword &&
                  formData.confirmPassword && (
                    <div className="text-sm text-red-600">
                      Las contraseñas no coinciden
                    </div>
                  )}

                {partnersData?.partners?.partners && (
                  <div>
                    <Label htmlFor="partnerId">Empresa (opcional)</Label>
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
          )}

          {/* Type-specific fields */}
          {formData.type && renderTypeSpecificFields()}

          {/* Additional Information */}
          {formData.type && (
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
                  <Label htmlFor="notes">Notas (opcional)</Label>
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
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          {formData.type && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${selectedUserType?.color}`}
                  >
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{selectedUserType?.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedUserType?.description}
                    </div>
                  </div>
                </div>

                {formData.firstName && formData.lastName && (
                  <div>
                    <Label className="text-sm font-medium">
                      Nombre completo
                    </Label>
                    <div className="text-sm">
                      {formData.firstName} {formData.lastName}
                    </div>
                  </div>
                )}

                {formData.email && (
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <div className="text-sm">{formData.email}</div>
                  </div>
                )}

                {formData.phone && (
                  <div>
                    <Label className="text-sm font-medium">Teléfono</Label>
                    <div className="text-sm">{formData.phone}</div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium">Estado</Label>
                  <Badge variant={formData.isEnabled ? 'default' : 'secondary'}>
                    {formData.isEnabled ? 'Activo' : 'Desactivado'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!validateForm() || creating}
                  className="w-full"
                >
                  {creating ? (
                    'Creando...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Crear Usuario
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/users">Cancelar</Link>
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
              <p>• Todos los campos marcados con (*) son obligatorios</p>
              <p>• La contraseña debe tener al menos 8 caracteres</p>
              <p>
                • El usuario recibirá un email de bienvenida automáticamente
              </p>
              <p>• Puedes editar la información después de crear el usuario</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
