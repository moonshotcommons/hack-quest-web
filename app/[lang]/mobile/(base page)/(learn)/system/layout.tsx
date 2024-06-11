import * as React from 'react';
import { EcosystemSelectNew } from '@/components/ecosystem/ecosystem-select-new';
import { MintCertificateModal } from '../../(home)/dashboard/components/mint-certificate-modal';
import { ClaimCertificateModal } from '../../(home)/dashboard/components/claim-certificate-modal';
import { UsernameModal } from '../../(home)/dashboard/components/username-modal';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-neutral-off-white">
      <div className="px-5 pt-6">
        <EcosystemSelectNew />
      </div>
      {children}
      <ClaimCertificateModal />
      <MintCertificateModal />
      <UsernameModal />
    </div>
  );
}
