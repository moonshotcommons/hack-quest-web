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
    <div className="container relative mx-auto h-[114.5px]">
      <div className="container absolute bottom-0 left-0 h-[220px] max-w-[1350px] gap-[32px] rounded-sm border border-dashed border-neutral-black bg-[#EDEDED]">
        <div className="container absolute -left-[10px] bottom-[10px] flex h-[220px] max-w-[1350px] justify-between border border-neutral-black bg-neutral-white">
          <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
            <p className="text-h2 text-neutral-off-black">
              <CountUp
                start={0}
                end={10}
                duration={3}
                // enableScrollSpy
              ></CountUp>
              +
            </p>
            <p className="body-l w-[234px] text-center text-neutral-medium-gray">{t('totalUsers')}</p>
          </div>
          <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
            <p className="text-h2 text-neutral-off-black">
              <CountUp
                start={0}
                end={20}
                duration={3}
                // enableScrollSpy
              ></CountUp>
              +
            </p>
            <p className="body-l w-[234px] text-center text-neutral-medium-gray">{t('totalStakedValue')}</p>
          </div>
          <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
            <p className="text-h2 text-neutral-off-black">
              <CountUp
                start={0}
                end={30}
                duration={3}
                // enableScrollSpy
              ></CountUp>
              +
            </p>
            <p className="body-l w-[234px] text-center text-neutral-medium-gray">{t('totalFuel')}</p>
          </div>
          <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
            <p className="text-h2 text-neutral-off-black">
              <CountUp
                start={0}
                end={30}
                duration={3}
                // enableScrollSpy
              ></CountUp>
              +
            </p>
            <p className="body-l w-[234px] text-center text-neutral-medium-gray">{t('totalAirdropToken')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStatistics;
