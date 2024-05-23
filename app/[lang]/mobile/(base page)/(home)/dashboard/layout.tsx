import { EcosystemSelect } from '@/components/ecosystem/ecosystem-select';
import { ClaimCertificateModal } from './components/claim-certificate-modal';

export default function DashboardLayout({
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
      {/* <ViewCertificateModal /> */}
      <ClaimCertificateModal />
    </div>
  );
}
