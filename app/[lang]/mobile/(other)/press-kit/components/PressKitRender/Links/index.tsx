import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { linksData } from '@/app/[lang]/(web)/(base page)/(more)/press-kit/constants/data';
import Image from 'next/image';
import Link from 'next/link';

interface LinksProp {
  lang: Lang;
}

const Links: React.FC<LinksProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2-mob mb-[1.25rem]">{t('links')}</h1>
      <div className="flex flex-col gap-[20px]">
        {linksData.map((v, i) => (
          <Link className="w-full" key={i} href={v.link}>
            <div className="card-hover flex w-full items-center gap-[1rem] overflow-hidden rounded-[1rem] bg-neutral-white px-[1rem] py-[.75rem]">
              <div className="relative h-[3rem] w-[3rem] flex-shrink-0 overflow-hidden rounded-[.5rem] bg-neutral-light-gray">
                {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
              </div>
              <div className="">
                <p className="caption-10pt mb-[4px] line-clamp-1 w-full text-neutral-medium-gray">{v.link}</p>
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
