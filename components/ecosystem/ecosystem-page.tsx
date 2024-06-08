import * as React from 'react';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getEcosystemsCached, getEcosystemCached, getLevelsCached } from '@/service/cach/ecosystems';
import { EcosystemContent } from './ecosystem-content';
import { CertificationInfo } from './certification-info';

function PageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export async function generateStaticParams() {
  const ecosystems = await getEcosystemsCached({});
  return ecosystems.map((ecosystem) => ({
    ecosystemId: ecosystem.id
  }));
}

export default async function Page({ params }: { params: { ecosystemId: string; lang: string } }) {
  try {
    const ecosystem = await getEcosystemCached(params);
    const levels = await getLevelsCached(params);
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        <CertificationInfo ecosystem={ecosystem} levels={levels} />
        <EcosystemContent />
      </React.Suspense>
    );
  } catch (error: any) {
    if (error.code === 401) {
      redirect('/');
    }
  }
}
