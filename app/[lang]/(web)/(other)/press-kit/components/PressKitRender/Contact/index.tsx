import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { contactData } from '../../../constants/data';
import SubTitle from '../../SubTitle';

interface ContactProp {
  lang: Lang;
}

const Contact: React.FC<ContactProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2 mb-[40px]">{t('contact')}</h1>
      <div className="flex flex-col gap-[40px] text-neutral-black">
        {contactData.map((v) => (
          <div key={v.id}>
            <SubTitle title={v.title} />
            {v.content.map((c, j) => (
              <p key={j} className="body-l ">
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
