import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import { data } from './constant';
import Button from '@/components/Common/Button';
import { useTranslation } from '@/i18n/server';

interface OurSupportForProjectsProps {
  lang: Lang;
}

const OurSupportForProjects: FC<OurSupportForProjectsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="relative mx-auto flex w-full flex-col items-center px-5 py-10">
      <h2 className="text-h2-mob mb-6 text-center text-neutral-black">{t('projectsSupport')}</h2>
      <p className="body-s mx-auto text-center">{t('projectsSupportDesc')}</p>
      <div className="flex flex-wrap justify-center gap-4 py-10">
        {data.map((item) => {
          return (
            <div key={item} className="body-xs-bold rounded-[16px] bg-neutral-white p-3 tracking-tight  text-neutral-black">
              {t(item)}
            </div>
          );
        })}
      </div>
      <Button ghost className="button-text-m px-6 py-4 uppercase">
        {t('projectsSupportSubmitBtnText')}
      </Button>
    </div>
  );
};

export default OurSupportForProjects;
