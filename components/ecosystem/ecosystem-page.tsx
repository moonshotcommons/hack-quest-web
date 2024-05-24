import { cookies } from 'next/headers';
import { EcosystemContent } from './ecosystem-content';
import { CertificationInfo } from './certification-info';

export default async function Page({ params }: { params: { ecosystemId: string } }) {
  const token = cookies().get('token')?.value || '';
  const response = await fetch(`https://api.dev.hackquest.io/v1/ecosystems/${params.ecosystemId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  const res = await fetch(`https://api.dev.hackquest.io/v1/certifications/${data.level.certificationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const certificate = await res.json();
  return (
    <>
      <CertificationInfo ecosystem={data} certificate={certificate} />
      <EcosystemContent />
    </>
  );
}
