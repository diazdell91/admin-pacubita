'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PartnerRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.partnerId as string;

  useEffect(() => {
    // Redirect to staff tab by default
    if (partnerId) {
      router.replace(`/dashboard/partners/${partnerId}/staff`);
    }
  }, [partnerId, router]);

  return <div>Redirecting...</div>;
}