import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';

import Image from 'next/image';
import { data } from './constant';
import { useTranslation } from '@/i18n/server';

interface OnlyChooseBestProjectsProps {
  lang: Lang;
}

const OnlyChooseBestProjects: FC<OnlyChooseBestProjectsProps> = async ({
  lang
}) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="mt-5 w-full py-20">
      <h2 className="text-h2 mb-20 text-center text-neutral-black">
        {t('chooseBestProject')}
      </h2>
      <div className="container mx-auto flex items-center justify-between gap-20">
        <div>
          <Image
            src={'/images/launch/best_projects_left.svg'}
            alt=""
            width={585}
            height={500}
          ></Image>
        </div>
        <div className="flex flex-1 flex-col">
          {data.map((item, index) => {
            return (
              <div key={item.title} className="overflow-hidden">
                <div className="flex flex-col gap-6 px-6 py-6">
                  <p className="body-xl-bold text-neutral-off-black">
                    {t(item.title)}
                  </p>
                  <p className="body-s text-neutral-rich-gray">
                    {t(item.desc)}
                  </p>
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
