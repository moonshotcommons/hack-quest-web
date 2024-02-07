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
  certification: CertificationType | null;
  refreshCertification: VoidFunction;
}>({
  certification: null,
  refreshCertification: () => {}
});

const CertificationCardProvider: FC<CertificationCardProviderProps> = ({
  certification,
  children
}) => {
  const { data, refresh } = useRequest(async () => {
    return webApi.campaignsApi.fetchCertificationDetail(certification.id);
  });

  return (
    <CertificationCardContext.Provider
      value={{
        certification: data ?? certification,
        refreshCertification: refresh
      }}
    >
      {children}
    </CertificationCardContext.Provider>
  );
};

export default CertificationCardProvider;
