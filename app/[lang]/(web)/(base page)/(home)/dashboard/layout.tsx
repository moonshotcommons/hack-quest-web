import * as React from 'react';
import { cookies } from 'next/headers';
import { EcosystemSelect } from '@/components/ecosystem/ecosystem-select';
import { MyCertificateCard } from './components/my-certificate-card';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { EcosystemProvider } from '@/components/ecosystem/ecosystem-provider';
import { ClaimCertificateModal } from './components/claim-certificate-modal';
import { MintCertificateModal } from './components/mint-certificate-modal';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('token')?.value || '';
  const response = await fetch('https://api.dev.hackquest.io/v1/ecosystems', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return (
    <EcosystemProvider ecosystems={data}>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-[1fr_320px] gap-10">
          <div className="flex flex-col">
            <EcosystemSelect ecosystems={data} />
            <div className="py-8">{children}</div>
          </div>
          <div className="flex flex-col gap-8">
            {/* <HackathonCard /> */}
            {/* <MissionCenterCard /> */}
            <MyCertificateCard />
            <FollowDiscord />
          </div>
        </div>
      </div>
      <ClaimCertificateModal />
      <MintCertificateModal />
    </EcosystemProvider>
  );
}
