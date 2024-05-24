import { cookies } from 'next/headers';
import { EcosystemSelect } from '@/components/ecosystem/ecosystem-select';
import { EcosystemProvider } from '@/components/ecosystem/ecosystem-provider';
import { MintCertificateModal } from './components/mint-certificate-modal';
import { ClaimCertificateModal } from './components/claim-certificate-modal';

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
      <div className="min-h-[calc(100vh-4rem)] w-full bg-neutral-off-white">
        <div className="px-5 pt-6">
          <EcosystemSelect ecosystems={data} />
        </div>
        {children}
        <ClaimCertificateModal />
        <MintCertificateModal />
      </div>
    </EcosystemProvider>
  );
}
