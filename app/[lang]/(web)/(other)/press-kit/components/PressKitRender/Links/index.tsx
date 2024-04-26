import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { linksData } from '../../../constants/data';
import Image from 'next/image';
import Link from 'next/link';

interface LinksProp {
  lang: Lang;
}

const Links: React.FC<LinksProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2 mb-[40px]">{t('links')}</h1>
      <div className="flex flex-wrap gap-[20px]">
        {linksData.map((v, i) => (
          <Link key={i} className="w-[calc((100%-20px)/2)]" href={v.link}>
            <div className="card-hover flex w-full  items-center gap-[16px] overflow-hidden rounded-[16px] bg-neutral-white px-[16px] py-[12px]">
              <div className="relative h-[48px] w-[48px] overflow-hidden rounded-[8px] bg-neutral-light-gray">
                {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
              </div>
              <div className="">
                <p className="caption-10pt mb-[4px] text-neutral-medium-gray">{v.link}</p>
                <h2 className="body-l-bold text-neutral-off-black">{v.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Links;
