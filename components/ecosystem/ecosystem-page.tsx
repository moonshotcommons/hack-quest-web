import { cookies } from 'next/headers';
import webApi from '@/service';
import { EcosystemContent } from './ecosystem-content';
import { CertificationInfo } from './certification-info';

export default async function Page({ params }: { params: { ecosystemId: string } }) {
  const token = cookies().get('token')?.value || '';
  const ecosystem = await webApi.ecosystemApi.getEcosystemsDetailById(params.ecosystemId, {}, token);
  const levels = await webApi.ecosystemApi.getLevels(params.ecosystemId, token);

  return (
    <>
      <CertificationInfo ecosystem={ecosystem} levels={levels} />
      <EcosystemContent />
    </>
  );
}
