import { EcosystemDetailType, LevelType } from '@/service/webApi/ecosystem/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MedalCover from '@/public/images/learn/medal_cover.png';
import { useRequest } from 'ahooks';
import { getToken } from '@/helper/user-token';
import webApi from '@/service';

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
    <div className="flex flex-col  gap-[1.25rem] rounded-[1rem] bg-neutral-white p-[1.25rem]">
      <div className="flex-1">
        <div className="relative h-[2rem] w-[1.5rem] overflow-hidden">
          <Image src={MedalCover} alt={ecosystem?.info?.name} fill className="object-cover" />
        </div>
        <h2 className="body-l-bold  mt-[.5rem] text-neutral-off-black">{ecosystem?.info?.name} Certificate</h2>
      </div>

      <div className="flex flex-shrink-0 items-center gap-[.3125rem]">
        {levels.map((v, i) => (
          <div key={v.certificationId} className="flex items-center gap-[.3125rem]">
            {i > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path
                  d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 -8.94676e-07 17.4678 -8.27378e-07 15.9282L-2.21695e-07 2.0718C-1.54397e-07 0.532196 1.66667 -0.430055 3 0.339746L15 7.26795Z"
                  fill="#FAD81C"
                />
              </svg>
            )}
            <div>
              <div className="relative h-0 w-full overflow-hidden rounded-[.25rem] pt-[56.7%] shadow-[0_0_8px_rgba(0,0,0,0.12)]">
                <Image src={v.certification.image} alt={v.label} fill className="object-cover" />
              </div>
              <div className="body-s-bold mt-[.75rem] text-center">
                Lvl {v.level}. {v.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="body-m text-neutral-medium-gray">{ecosystem?.info?.certificateDesc}</p>
    </div>
  );
};

export default Certificate;
