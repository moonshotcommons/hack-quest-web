import { EcosystemDetailType, LevelType } from '@/service/webApi/ecosystem/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MedalCover from '@/public/images/learn/medal_cover.png';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { getToken } from '@/helper/user-token';

interface CertificateProp {
  ecosystem: EcosystemDetailType;
}

const Certificate: React.FC<CertificateProp> = ({ ecosystem }) => {
  const [levels, setLevels] = useState<LevelType[]>([]);
  const { run } = useRequest(
    async () => {
      const token = getToken();
      const res = await webApi.ecosystemApi.getLevels(ecosystem?.info.id, token as string);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setLevels(res);
      }
    }
  );

  useEffect(() => {
    if (ecosystem?.info?.id) {
      run();
    }
  }, [ecosystem]);
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
            <div>
              <div className="overflow-hidden rounded-[8px] shadow-[0_0_8px_rgba(0,0,0,0.12)]">
                <Image src={v.certification.image} alt={v.label} width={283} height={160} />
              </div>
              <div className="body-m-bold mt-[14px] text-center">
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
