import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Link from 'next/link';
// import Image from 'next/image';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

interface CourseCardProp {
  lang: Lang;
  type: string;
  link: string;
  count: number;
}

const CourseCard: React.FC<CourseCardProp> = async ({ lang, type, link, count }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <Link
      href={link}
      className="card-hover flex items-center  justify-between gap-[20px] rounded-[16px] bg-neutral-white p-[24px]"
    >
      <div className="flex flex-1 flex-col gap-[16px] ">
        <h2 className="body-xl-bold text-neutral-black">{t(`explore.${type}`)}</h2>
        <p className="body-s text-neutral-medium-gray">{t(`explore.${type}Intro`)}</p>
        <div className="flex flex-wrap gap-[4px]">
          <div className="relative h-[16px] w-[16px] overflow-hidden">
            {/* <Image src={} alt={} fill className='object-contain' /> */}
          </div>
        </div>
      </div>
      <div className="body-m flex flex-shrink-0 items-center gap-[32px] text-neutral-dark-gray">
        <span>{`${count} ${t(`explore.${type}`)}s`}</span>
        <GoArrowRight size={24} />
      </div>
    </Link>
  );
};

export default CourseCard;
