import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { articlesData } from '../../../constants/data';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

interface ArticlesProp {
  lang: Lang;
}

const Articles: React.FC<ArticlesProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  const articles = articlesData.filter((v) => v.link);
  return (
    <div>
      <h1 className="text-h2 mb-[40px]">{t('articles')}</h1>
      <div className="flex flex-wrap gap-[20px]">
        {articles.map((v, i) => (
          <Link key={i} className="w-[calc((100%-40px)/3)]" href={v.link || ''} target="_blank">
            <div className="card-hover w-full overflow-hidden  rounded-[16px] bg-neutral-white">
              <div className="relative h-0 w-full bg-neutral-light-gray pt-[56.25%]">
                {v.img && <Image src={v.img} alt={v.title} fill className="object-cover" />}
              </div>
              <div className="flex h-[195px] flex-col justify-between p-[16px]">
                <div>
                  <h2 className="body-s-bold mb-[8px] line-clamp-2 text-neutral-off-black">{v.title}</h2>
                  <p className="body-xs relative line-clamp-4 pl-[12px] pt-[12px]">
                    {v.descrption}{' '}
                    <span className="body-xl-bold absolute left-0 top-0  text-neutral-medium-gray">“</span>{' '}
                  </p>
                </div>
                <p className="caption-12pt text-neutral-rich-gray">{moment(v.time).format('ll')}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Articles;
