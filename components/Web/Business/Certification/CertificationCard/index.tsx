import Image from 'next/image';
import { FC } from 'react';

import LearnMoreButton from './LearnMoreButton';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';

interface CertificationCardProps {
  certification: UserCertificateInfo;
}

const CertificationCard: FC<CertificationCardProps> = async (props) => {
  const { certification } = props;

  if (!certification) return null;

  return (
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
  );
};

export default CertificationCard;
