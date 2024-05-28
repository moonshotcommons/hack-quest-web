import * as React from 'react';
import { EcosystemSelect } from '@/components/ecosystem/ecosystem-select';
import { MintCertificateModal } from '../../(home)/dashboard/components/mint-certificate-modal';
import { ClaimCertificateModal } from '../../(home)/dashboard/components/claim-certificate-modal';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-neutral-off-white">
      <div className="px-5 pt-6">
        <EcosystemSelect />
      </div>
      {children}
      <ClaimCertificateModal />
      <MintCertificateModal />
    </div>
  );
}
