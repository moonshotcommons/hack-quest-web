import * as React from 'react';
import { getEcosystemCached, getLevelsCached } from '@/service/cach/ecosystems';
import { EcosystemContent } from './ecosystem-content';
import { CertificationInfo } from './certification-info';

export default async function Page({ params }: { params: { ecosystemId: string; lang: string } }) {
  const ecosystem = await getEcosystemCached(params);
  const levels = await getLevelsCached(params);

  return (
    <React.Suspense fallback={null}>
      <CertificationInfo ecosystem={ecosystem} levels={levels} />
      <EcosystemContent />
    </React.Suspense>
  );
}
