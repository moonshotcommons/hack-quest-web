import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';

import Image from 'next/image';
import { data } from './constant';
import { useTranslation } from '@/i18n/server';

interface OnlyChooseBestProjectsProps {
  lang: Lang;
}

const OnlyChooseBestProjects: FC<OnlyChooseBestProjectsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="w-full px-5 py-10">
      <h2 className="text-h2-mob mb-10 text-center text-neutral-black">{t('chooseBestProject')}</h2>
      <div className="relative flex w-full flex-col items-center justify-between gap-10">
        <div className="relative h-0 w-full pt-[85.7143%]">
          <Image src={'/images/launch/best_projects_left.svg'} alt="" fill></Image>
        </div>
        <div className="flex flex-1 flex-col">
          {data.map((item, index) => {
            return (
              <div key={item.title} className="overflow-hidden">
                <div className="flex flex-col gap-3 px-3">
                  <p className="body-l-bold text-neutral-off-black">{t(item.title)}</p>
                  <p className="body-s text-neutral-rich-gray">{t(item.desc)}</p>
                </div>
                {index !== data.length - 1 && (
                  <div className="my-8 h-0 w-full border-spacing-4 scale-x-[3] overflow-hidden border-b border-dashed border-neutral-medium-gray "></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnlyChooseBestProjects;
