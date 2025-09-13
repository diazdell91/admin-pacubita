'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, Plus, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { usePartnersQuery } from '@/lib/graphql/generated';
import { usePartnerStore } from '@/stores/partnerStore';

export default function PartnersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelectedPartner } = usePartnerStore();

  const { data, loading, error, refetch } = usePartnersQuery({
    variables: {
      input: {
        _: null, // Required placeholder field
      },
    },
  });

  const handlePartnerSelect = (partner: any) => {
    setSelectedPartner({
      id: partner.id,
      name: partner.name,
    });
    router.push(`/dashboard/partners/${partner.id}/staff`);
  };

  const partners = data?.partners?.partners || [];
  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'Partner Name',
      sortable: true,
      render: (value: any, partner: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{partner.name}</div>
            <div className="text-sm text-muted-foreground">ID: {partner.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Partner ID',
      render: (value: any) => (
        <Badge variant="secondary" className="font-mono">
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, partner: any) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePartnerSelect(partner)}
          className="flex items-center gap-2"
        >
          View Users
          <ChevronRight className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Partners"
          description="Manage partners and their user groups"
        />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Partners"
          description="Manage partners and their user groups"
        />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Error loading partners: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partners"
        description="Manage partners and their user groups"
      >
        <Button onClick={() => router.push('/dashboard/partners/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredPartners.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No partners found"
              description={
                searchTerm
                  ? "No partners match your search criteria"
                  : "No partners have been added yet"
              }
            />
          ) : (
            <DataTable
              data={filteredPartners as any}
              columns={columns as any}
              searchable={false} // We handle search manually
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}