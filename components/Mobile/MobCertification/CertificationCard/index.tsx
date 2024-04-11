import webApi from '@/service';
import { FC } from 'react';

import CertificationCardProvider from './CertificationCardProvider';
import LearnMoreButton from './LearnMoreButton';
import { Lang } from '@/i18n/config';

interface CertificationCardProps {
  certificationId: string;
  lang: Lang;
}

const CertificationCard: FC<CertificationCardProps> = async (props) => {
  const { certificationId } = props;

  const certification = await webApi.campaignsApi.fetchCertificationDetail(certificationId);

  return (
    <CertificationCardProvider certification={certification}>
      <div className="flex flex-col items-center justify-between gap-5 rounded-[16px] bg-yellow-extra-light p-4">
        {certification?.image && (
          <img
            // fill
            src={certification?.image || ''}
            alt="certification"
            className="z-40 w-full object-contain"
          ></img>
        )}

        <div className="flex flex-col gap-4">
          <h4 className="text-h4-mob">{certification.name}</h4>
          <p className="body-s">{certification.description}</p>
          <LearnMoreButton certification={certification} />
        </div>
      </div>
    </CertificationCardProvider>
  );
};

export default CertificationCard;
