import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import CountUp from '@/components/Common/CountUp';
import { countData } from '@/app/[lang]/(web)/(base page)/(resource)/partners/constants/data';

interface PartnerDataProp {
  lang: Lang;
}

const PartnerData: React.FC<PartnerDataProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="relative z-[2] flex flex-col gap-[32px] border border-neutral-black bg-neutral-white py-[2.5rem]">
          {countData.map((v) => (
            <div key={v.id} className="text-center">
              <p className="text-h2-mob mb-[1rem] text-neutral-off-black">
                <CountUp start={0} end={v.number} duration={3} />
                {v.id === 1 ? 'M' : ''}+
              </p>
              <p className="body-s text-neutral-medium-gray">{t(`partners.${v.label}`)}</p>
            </div>
          ))}
        </div>
        <div className="absolute left-[0.1875rem] top-[0.1875rem] z-[1]  h-full w-full   border-[1px] border-dashed border-neutral-black bg-[#ededed]"></div>
      </div>
    </div>
  );
};

export default PartnerData;
