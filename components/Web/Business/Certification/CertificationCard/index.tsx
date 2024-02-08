import webApi from '@/service';
import Image from 'next/image';
import { FC } from 'react';

import CertificationCardProvider from './CertificationCardProvider';
import LearnMoreButton from './LearnMoreButton';

interface CertificationCardProps {
  certificationId: string;
}

const CertificationCard: FC<CertificationCardProps> = async (props) => {
  const { certificationId } = props;

  const certification =
    await webApi.campaignsApi.fetchCertificationDetail(certificationId);

  if (!certification) return null;

  return (
    <CertificationCardProvider certification={certification}>
      <div className="flex items-center justify-between gap-4 rounded-[16px] bg-yellow-extra-light p-6">
        <div className="flex flex-col gap-4">
          <h4 className="text-h4">{certification.name}</h4>
          <p className="body-s">{certification.description}</p>
          <LearnMoreButton certification={certification} />
        </div>
        {certification?.image && (
          <Image
            width={238}
            height={132}
            src={certification?.image || ''}
            alt="certification"
            className="z-50 object-contain"
          ></Image>
        )}
      </div>
    </CertificationCardProvider>
  );
};

export default CertificationCard;
