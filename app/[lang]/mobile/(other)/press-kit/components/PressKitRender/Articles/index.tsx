import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { ArticlesData } from '@/app/[lang]/(web)/(other)/press-kit/constants/data';
import Image from 'next/image';
import moment from 'moment';

interface ArticlesProp {
  lang: Lang;
}

const Articles: React.FC<ArticlesProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2-mob mb-[1.25rem]">{t('articles')}</h1>
      <div className="flex flex-wrap gap-[1rem]">
        {ArticlesData.map((v) => (
          <div
            key={v.id}
            className="card-hover w-[calc((100%-1rem)/2)] overflow-hidden  rounded-[1rem] bg-neutral-white"
          >
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%]">
              {v.img && <Image src={v.img} alt={v.title} fill className="object-cover" />}
            </div>
            <div className="flex h-[10.375rem] flex-col justify-between px-[1rem] py-[.5rem]">
              <div>
                <h2 className="body-xs mb-[.5rem] line-clamp-3 text-neutral-off-black">{v.title}</h2>
                <p className="caption-10pt relative line-clamp-4 pl-[.5rem] pt-[.5rem]">
                  {v.descrption} <span className="body-l-bold absolute left-0 top-0  text-neutral-medium-gray">“</span>{' '}
                </p>
              </div>
              <p className="caption-10pt text-neutral-rich-gray">{moment(v.time).format('ll')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
