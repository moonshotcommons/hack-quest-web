'use client';
import { FC, ReactNode, createContext } from 'react';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
interface CertificationCardProviderProps {
  certificationId?: string;
  children: ReactNode;
}

export const CertificationCardContext = createContext<{
  certification?: CertificationType;
  refreshCertification: VoidFunction;
  refreshCertificationAsync: () => Promise<CertificationType | void>;
}>({
  refreshCertification: () => {},
  refreshCertificationAsync: async () => {}
});

const CertificationCardProvider: FC<CertificationCardProviderProps> = ({
  certificationId,
  children
}) => {
  const { data, refresh, refreshAsync } = useRequest(async () => {
    if (!certificationId) return;
    return webApi.campaignsApi.getCertificationDetail(certificationId);
  });

  return (
    <CertificationCardContext.Provider
      value={{
        certification: data,
        refreshCertification: refresh,
        refreshCertificationAsync: refreshAsync
      }}
    >
      {children}
    </CertificationCardContext.Provider>
  );
};

export default CertificationCardProvider;
