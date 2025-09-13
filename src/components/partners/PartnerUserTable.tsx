'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Shield, User, Plus, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/common/DataTable';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { PartnerUser } from '@/stores/partnerStore';

export interface PartnerUserTableProps {
  users: PartnerUser[];
  userType: 'staff' | 'clients' | 'drivers';
  loading: boolean;
  error?: string;
  onAddUser: () => void;
  onEditUser: (user: PartnerUser) => void;
  onToggleUser: (user: PartnerUser) => void;
}

const getUserTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'staff':
      return Shield;
    case 'client':
      return User;
    case 'driver':
      return User; // Could use a truck icon
    default:
      return User;
  }
};

const getUserTypeLabel = (type: string) => {
  switch (type.toLowerCase()) {
    case 'staff':
      return 'Personal';
    case 'client':
      return 'Cliente';
    case 'driver':
      return 'Conductor';
    default:
      return type;
  }
};

const getUserTypeBadgeVariant = (type: string) => {
  switch (type.toLowerCase()) {
    case 'staff':
      return 'default';
    case 'client':
      return 'secondary';
    case 'driver':
      return 'outline';
    default:
      return 'secondary';
  }
};

export function PartnerUserTable({
  users,
  userType,
  loading,
  error,
  onAddUser,
  onEditUser,
  onToggleUser,
}: PartnerUserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    [user.firstName, user.lastName, user.email, user.phone]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const columns = [
    {
      key: 'user',
      label: 'Usuario',
      sortable: true,
      render: (_: any, user: PartnerUser) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3 h-3" />
              {user.email}
              {user.isEmailVerified && (
                <Badge variant="secondary" className="text-xs px-1">
                  ✓
                </Badge>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contacto',
      render: (_: any, user: PartnerUser) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-3 h-3" />
            {user.phone}
            {user.isPhoneVerified && (
              <Badge variant="secondary" className="text-xs px-1">
                ✓
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (_: any, user: PartnerUser) => (
        <Badge variant={getUserTypeBadgeVariant(user.type) as any}>
          {getUserTypeLabel(user.type)}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (_: any, user: PartnerUser) => (
        <Badge variant={user.isEnabled ? 'default' : 'secondary'}>
          {user.isEnabled ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Creado',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-muted-foreground">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, user: PartnerUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditUser(user)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleUser(user)}>
              {user.isEnabled ? 'Desactivar' : 'Activar'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const TypeIcon = getUserTypeIcon(userType);
  const typeLabel = getUserTypeLabel(userType);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5" />
            {typeLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5" />
            {typeLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TypeIcon className="w-5 h-5" />
            {typeLabel} ({users.length})
          </CardTitle>
          <Button onClick={onAddUser}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar {typeLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={`Buscar ${typeLabel.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <EmptyState
            icon={TypeIcon}
            title={`No ${typeLabel.toLowerCase()} found`}
            description={
              searchTerm
                ? "No users match your search criteria"
                : `No ${typeLabel.toLowerCase()} have been added yet`
            }
          />
        ) : (
          <DataTable
            data={filteredUsers as any}
            columns={columns as any}
            searchable={false}
          />
        )}
      </CardContent>
    </Card>
  );
}