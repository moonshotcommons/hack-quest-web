import { FC } from 'react';
import CountUp from './CountUp';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
interface DataStatisticsProps {
  lang: Lang;
}

const DataStatistics: FC<DataStatisticsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="relative mx-auto w-full px-5 py-10">
      <div className="absolute left-[24px] top-[10px] z-[1] mt-10 h-[428px] w-[calc(100%-40px)] border border-dashed border-neutral-black py-9"></div>
      <div className="relative z-[10] flex h-[432px] w-full flex-col gap-8 border border-neutral-black bg-neutral-white py-9">
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-neutral-off-black">
            <CountUp start={0} end={10} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-neutral-medium-gray">
            {t('totalUsers')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-neutral-off-black">
            <CountUp start={0} end={20} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-neutral-medium-gray">
            {t('totalStakedValue')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob h-[26px] text-neutral-off-black">
            <CountUp start={0} end={30} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-neutral-medium-gray">
            {t('totalFuel')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-h2-mob text-neutral-off-black">
            <CountUp start={0} end={30} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-s w-[234px] text-center text-neutral-medium-gray">
            {t('totalAirdropToken')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataStatistics;
