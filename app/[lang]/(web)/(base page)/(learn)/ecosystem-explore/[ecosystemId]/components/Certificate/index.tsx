import { EcosystemDetailType, LevelType } from '@/service/webApi/ecosystem/type';
import Image from 'next/image';
import React from 'react';
import MedalCover from '@/public/images/learn/medal_cover.png';
import BaseImage from '@/components/Common/BaseImage';

interface CertificateProp {
  ecosystem: EcosystemDetailType;
  levels: LevelType[];
}

const Certificate: React.FC<CertificateProp> = ({ ecosystem, levels }) => {
  return (
    <div className="flex items-center gap-[48px] rounded-[16px] bg-yellow-extra-light p-[24px]">
      <div className="flex-1">
        <div>
          <Image src={MedalCover} alt={''} width={30} height={40} />
        </div>
        <h2 className="body-l-bold mb-[8px] mt-[16px] text-neutral-off-black">{ecosystem?.info?.name} Certificate</h2>
        <p className="body-m text-neutral-medium-gray">{ecosystem?.info?.certificateDesc}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-[24px]">
        {levels.map((v, i) => (
          <div key={v.certificationId} className="flex items-center gap-[24px]">
            {i > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
                <path
                  d="M21.25 11.2679C22.5833 12.0378 22.5833 13.9622 21.25 14.7321L3.25 25.1244C1.91666 25.8942 0.249999 24.9319 0.249999 23.3923L0.25 2.60769C0.25 1.06809 1.91667 0.105843 3.25 0.875644L21.25 11.2679Z"
                  fill="#FAD81C"
                />
              </svg>
            )}
            <div className="flex flex-col items-center">
              <BaseImage
                src={v.certification.image}
                alt={v.label}
                className="h-[100px] w-[177px] rounded-[8px] shadow-[0_0_8px_rgba(0,0,0,0.12)]"
              />
              <div className="body-s-bold mt-[14px] text-center">
                Lvl {v.level}. {v.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
