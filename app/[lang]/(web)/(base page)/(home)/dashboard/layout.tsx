import * as React from 'react';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { EcosystemSelectNew } from '@/components/ecosystem/ecosystem-select-new';
import { ClaimCertificateModal } from './components/claim-certificate-modal';
import { MintCertificateModal } from './components/mint-certificate-modal';
import { UsernameModal } from './components/username-modal';
import { MyCertificateCard } from './components/my-certificate-card';
import DayStreak from '../../(reward)/mission-center/components/DayStreak';
import { getToken } from '@/helper/user-token';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!getToken()) {
    return redirect('/');
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-[1fr_320px] gap-10">
        <div className="flex flex-col">
          <EcosystemSelectNew />
          <div className="py-8">{children}</div>
        </div>
        <React.Suspense fallback={null}>
          <div className="flex flex-col gap-8">
            <DayStreak link className="bg-neutral-white p-4" />
            {/* <HackathonCard /> */}
            <MyCertificateCard />
            {/* <DailyChallenge /> */}
            <FollowDiscord />
          </div>
        </React.Suspense>
      </div>
      <ClaimCertificateModal />
      <MintCertificateModal />
      <UsernameModal />
    </div>
  );
}
