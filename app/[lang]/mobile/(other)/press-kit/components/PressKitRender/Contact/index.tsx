import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { contactData } from '@/app/[lang]/(web)/(other)/press-kit/constants/data';
import SubTitle from '../../SubTitle';

interface ContactProp {
  lang: Lang;
}

const Contact: React.FC<ContactProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2-mob mb-[1.25rem]">{t('contact')}</h1>
      <div className="body-s flex flex-col gap-[1.25rem] text-neutral-black">
        {contactData.map((v) => (
          <div key={v.id}>
            <SubTitle title={v.title} />
            {v.content.map((c, j) => (
              <p key={j} className="">
                {c}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
