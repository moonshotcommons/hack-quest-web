import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import Image from 'next/image';
import React from 'react';
import MedalCover from '@/public/images/learn/medal_cover.png';
import CertificateCover from '@/public/images/learn/certificate.png';
import CertificateAcitveCover from '@/public/images/learn/certificate_acitve.png';

interface CertificateProp {
  ecosystem: EcosystemDetailType;
}

const Certificate: React.FC<CertificateProp> = ({ ecosystem }) => {
  return (
    <div className="flex items-center gap-[48px] rounded-[16px] bg-neutral-white p-[24px]">
      <div className="flex-1">
        <div>
          <Image src={MedalCover} alt={''} width={30} height={40} />
        </div>
        <h2 className="body-xl-bold mb-[24px] mt-[16px] text-neutral-off-black">{ecosystem?.info?.name} Certificate</h2>
        <p className="body-m text-neutral-medium-gray">{ecosystem?.info?.certificateDesc}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-[24px]">
        <div>
          <Image
            src={ecosystem?.level?.level > 0 ? CertificateAcitveCover : CertificateCover}
            alt={''}
            width={283}
            height={160}
          />
          <div className="body-m-bold mt-[14px] text-center">Lvl 1. {true ? 'Starter' : 'Learner'}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
          <path
            d="M21.25 11.2679C22.5833 12.0378 22.5833 13.9622 21.25 14.7321L3.25 25.1244C1.91666 25.8942 0.249999 24.9319 0.249999 23.3923L0.25 2.60769C0.25 1.06809 1.91667 0.105843 3.25 0.875644L21.25 11.2679Z"
            fill="#FAD81C"
          />
        </svg>
        <div>
          <Image
            src={ecosystem?.level?.level > 1 ? CertificateAcitveCover : CertificateCover}
            alt={''}
            width={283}
            height={160}
          />
          <div className="body-m-bold mt-[14px] text-center">Lvl 2. {true ? 'Expert' : 'Builder'}</div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
