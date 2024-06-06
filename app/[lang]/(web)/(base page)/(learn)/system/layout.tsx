import * as React from 'react';
import { EcosystemSelect } from '@/components/ecosystem/ecosystem-select';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { MyCertificateCard } from '../../(home)/dashboard/components/my-certificate-card';
import { ClaimCertificateModal } from '../../(home)/dashboard/components/claim-certificate-modal';
import { MintCertificateModal } from '../../(home)/dashboard/components/mint-certificate-modal';
import { UsernameModal } from '../../(home)/dashboard/components/username-modal';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-[1fr_320px] gap-10">
        <div className="flex flex-col">
          <EcosystemSelect />
          <div className="py-8">{children}</div>
        </div>
        <div className="flex flex-col gap-8">
          {/* <HackathonCard /> */}
          {/* <MissionCenterCard /> */}
          <MyCertificateCard />
          <FollowDiscord />
        </div>
      </div>
      <ClaimCertificateModal />
      <MintCertificateModal />
      <UsernameModal />
    </div>
  );
}
