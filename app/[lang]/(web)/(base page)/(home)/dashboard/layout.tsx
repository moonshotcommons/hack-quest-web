import * as React from 'react';
import { EcosystemSelect } from './components/ecosystem-select';
import { HackathonCard } from './components/hackathon-card';
import { MissionCenterCard } from './components/mission-center-card';
import { MyCertificateCard } from './components/my-certificate-card';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { ClaimCertificateModal } from './components/claim-certificate-modal';

export default function DashboardLayout({
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
          <HackathonCard />
          <MissionCenterCard />
          <MyCertificateCard />
          <FollowDiscord />
        </div>
      </div>
      {/* <ViewCertificateModal /> */}
      <ClaimCertificateModal />
    </div>
  );
}
