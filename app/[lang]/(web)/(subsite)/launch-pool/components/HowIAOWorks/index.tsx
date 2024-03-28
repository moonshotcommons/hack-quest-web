import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { data } from './constant';
import Link from 'next/link';
import { useTranslation } from '@/i18n/server';

interface HowIAOWorksProps {
  lang: Lang;
}

const HowIAOWorks: FC<HowIAOWorksProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="mt-5 w-full py-20">
      <h2 className="text-h2 mb-10 text-center text-neutral-black">{t('howIAOWorks')}</h2>
      <div className="relative w-full">
        <div className="absolute left-1/2 top-[12px] w-full -translate-x-1/2 border-b-[2px] border-dashed border-neutral-dark-gray"></div>
        <div className="container relative z-10 mx-auto flex gap-8">
          {data.map((item) => {
            return (
              <div key={item.title} className="flex-1 px-6">
                <span className="">{item.icon}</span>
                <div className="mt-4 flex flex-col gap-6 py-6">
                  <p className="body-xl-bold text-neutral-off-black">{t(item.title)}</p>
                  <p className="body-s text-neutral-black">{t(item.desc)}</p>
                  {item.buttonText && (
                    <Link href={item.buttonLink} target="_blank" className="body-m-bold flex cursor-pointer items-center gap-2">
                      <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                        {t(item.buttonText)}
                      </span>
                      <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 3.01221L10 8.30632L2.5 13.6004"
                          stroke="#0B0B0B"
                          strokeWidth="1.76471"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowIAOWorks;
