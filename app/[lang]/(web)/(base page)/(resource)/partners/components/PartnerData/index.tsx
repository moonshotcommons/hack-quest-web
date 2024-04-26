import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { countData } from '../../constants/data';
import CountUp from '@/components/Common/CountUp';

interface PartnerDataProp {
  lang: Lang;
}

const PartnerData: React.FC<PartnerDataProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container  mt-[-40px] ">
      <div className="relative">
        <div className="relative z-[2] flex  h-[220px] border border-neutral-black bg-neutral-white px-[32px] pt-[58px]">
          {countData.map((v) => (
            <div key={v.id} className="flex-1 text-center">
              <p className="text-h2 mb-[16px] text-neutral-off-black">
                <CountUp start={0} end={v.number} duration={3} />
                {v.id === 1 ? 'M' : ''}+
              </p>
              <p className="body-l text-neutral-medium-gray">{t(`partners.${v.label}`)}</p>
            </div>
          ))}
        </div>
        <div className="absolute left-[10px] top-[10px] z-[1]  h-full w-full border-[1px] border-dashed border-neutral-black bg-[#ededed]"></div>
      </div>
    </div>
  );
};

export default PartnerData;
