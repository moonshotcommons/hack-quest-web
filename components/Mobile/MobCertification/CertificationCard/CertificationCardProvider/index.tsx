'use client';
import { FC, ReactNode, createContext } from 'react';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
interface CertificationCardProviderProps {
  certification: CertificationType;
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
  certification,
  children
}) => {
  const { data, refresh, refreshAsync } = useRequest(async () => {
    return webApi.campaignsApi.getCertificationDetail(certification.id);
  });

  return (
    <CertificationCardContext.Provider
      value={{
        certification: data || certification,
        refreshCertification: refresh,
        refreshCertificationAsync: refreshAsync
      }}
    >
      {children}
    </CertificationCardContext.Provider>
  );
};

export default CertificationCardProvider;
