'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Building2, Users, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/common/PageHeader';
import { PartnerUserTable } from '@/components/partners/PartnerUserTable';
import { PartnerBreadcrumb, usePartnerBreadcrumb } from '@/components/partners/PartnerBreadcrumb';
import { 
  usePartnerQuery,
  useStaffUsersQuery,
  useClientUsersQuery,
  useDriverUsersQuery
} from '@/lib/graphql/generated';
import { usePartnerStore, PartnerUser } from '@/stores/partnerStore';

type UserType = 'staff' | 'clients' | 'drivers';

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.partnerId as string;
  const userType = params.userType as UserType;
  
  const { selectedPartner, setSelectedPartner } = usePartnerStore();

  // Fetch partner details
  const { data: partnerData, loading: partnerLoading } = usePartnerQuery({
    variables: { input: { id: partnerId } },
    skip: !partnerId,
  });

  // Fetch users based on type
  const { data: staffData, loading: staffLoading, error: staffError } = useStaffUsersQuery({
    variables: { 
      input: { 
        partnerId,
        pagination: { limit: 50, offset: 0 },
        sorting: { field: 'createdAt', direction: 'DESC' }
      } 
    },
    skip: !partnerId,
  });

  const { data: clientData, loading: clientLoading, error: clientError } = useClientUsersQuery({
    variables: { 
      input: { 
        partnerId,
        pagination: { limit: 50, offset: 0 },
        sorting: { field: 'createdAt', direction: 'DESC' }
      } 
    },
    skip: !partnerId,
  });

  const { data: driverData, loading: driverLoading, error: driverError } = useDriverUsersQuery({
    variables: { 
      input: { 
        partnerId,
        pagination: { limit: 50, offset: 0 },
        sorting: { field: 'createdAt', direction: 'DESC' }
      } 
    },
    skip: !partnerId,
  });

  // Update selected partner when data is loaded
  useEffect(() => {
    if (partnerData?.partner?.partner && !selectedPartner) {
      setSelectedPartner({
        id: partnerData.partner.partner.id,
        name: partnerData.partner.partner.name,
      });
    }
  }, [partnerData, selectedPartner, setSelectedPartner]);

  const handleTabChange = (newUserType: UserType) => {
    router.push(`/dashboard/partners/${partnerId}/${newUserType}`);
  };

  const handleBackToPartners = () => {
    router.push('/dashboard/partners');
  };

  const handleAddUser = (userType: UserType) => {
    router.push(`/dashboard/partners/${partnerId}/${userType}/create`);
  };

  const handleEditUser = (user: PartnerUser, userType: UserType) => {
    router.push(`/dashboard/partners/${partnerId}/${userType}/${user.id}/edit`);
  };

  const handleToggleUser = async (user: PartnerUser) => {
    // TODO: Implement user enable/disable mutation
    console.log('Toggle user:', user);
  };

  const partner = selectedPartner || partnerData?.partner?.partner;
  
  const staffUsers = staffData?.staffUsers?.staffUsers || [];
  const clientUsers = clientData?.clientUsers?.clientUsers || [];
  const driverUsers = driverData?.driverUsers?.driverUsers || [];

  const staffTotal = staffData?.staffUsers?.total || 0;
  const clientTotal = clientData?.clientUsers?.total || 0;
  const driverTotal = driverData?.driverUsers?.total || 0;

  const breadcrumbItems = usePartnerBreadcrumb(userType);

  if (partnerLoading) {
    return <div>Loading partner details...</div>;
  }

  if (!partner) {
    return <div>Partner not found</div>;
  }

  return (
    <div className="space-y-6">
      <PartnerBreadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title={`${partner.name}`}
        description="Manage partner users and permissions"
      >
        <Button
          variant="outline"
          onClick={handleBackToPartners}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Partners
        </Button>
      </PageHeader>

      {/* Partner Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {partner.name}
                <Badge variant="secondary">Partner</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">ID: {partner.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Staff</p>
                <p className="text-2xl font-bold text-blue-600">{staffTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium">Clients</p>
                <p className="text-2xl font-bold text-green-600">{clientTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
              <Truck className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Drivers</p>
                <p className="text-2xl font-bold text-orange-600">{driverTotal}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management Tabs */}
      <Tabs value={userType} onValueChange={handleTabChange as any}>
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          <TabsTrigger 
            value="staff" 
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-10"
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Staff</span>
            <span className="sm:hidden">Staff</span>
            <span className="text-xs">({staffTotal})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="clients" 
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-10"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clients</span>
            <span className="sm:hidden">Clients</span>
            <span className="text-xs">({clientTotal})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="drivers" 
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm h-10"
          >
            <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Drivers</span>
            <span className="sm:hidden">Drivers</span>
            <span className="text-xs">({driverTotal})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="mt-6">
          <PartnerUserTable
            users={staffUsers as PartnerUser[]}
            userType="staff"
            loading={staffLoading}
            error={staffError?.message}
            onAddUser={() => handleAddUser('staff')}
            onEditUser={(user) => handleEditUser(user, 'staff')}
            onToggleUser={handleToggleUser}
          />
        </TabsContent>

        <TabsContent value="clients" className="mt-6">
          <PartnerUserTable
            users={clientUsers as PartnerUser[]}
            userType="clients"
            loading={clientLoading}
            error={clientError?.message}
            onAddUser={() => handleAddUser('clients')}
            onEditUser={(user) => handleEditUser(user, 'clients')}
            onToggleUser={handleToggleUser}
          />
        </TabsContent>

        <TabsContent value="drivers" className="mt-6">
          <PartnerUserTable
            users={driverUsers as PartnerUser[]}
            userType="drivers"
            loading={driverLoading}
            error={driverError?.message}
            onAddUser={() => handleAddUser('drivers')}
            onEditUser={(user) => handleEditUser(user, 'drivers')}
            onToggleUser={handleToggleUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}