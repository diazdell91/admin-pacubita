'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePartnerStore } from '@/stores/partnerStore';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PartnerBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function PartnerBreadcrumb({ items }: PartnerBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function usePartnerBreadcrumb(userType?: string) {
  const { selectedPartner } = usePartnerStore();
  
  const baseBreadcrumb = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Partners', href: '/dashboard/partners' },
  ];

  if (selectedPartner) {
    baseBreadcrumb.push({
      label: selectedPartner.name,
      href: `/dashboard/partners/${selectedPartner.id}/staff`,
    });
    
    if (userType) {
      const userTypeLabels: Record<string, string> = {
        staff: 'Staff',
        clients: 'Clients',
        drivers: 'Drivers',
      };
      
      baseBreadcrumb.push({
        label: userTypeLabels[userType] || userType,
        href: undefined,
      });
    }
  }

  return baseBreadcrumb;
}