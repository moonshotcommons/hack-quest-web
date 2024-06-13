'use client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
// import { GoArrowRight } from 'react-icons/go';
import { BuildOnWebType } from '@/app/[lang]/(web)/(base page)/(learn)/ecosystem-explore/constants/type';
import { GoArrowRight } from 'react-icons/go';

interface CourseCardProp {
  course: BuildOnWebType;
}

const CourseCard: React.FC<CourseCardProp> = ({ course }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Link
      href={course.link}
      className="card-hover flex flex-col   justify-between gap-[1rem] rounded-[1rem] bg-neutral-white p-[1rem]"
    >
      <div className="flex  flex-col gap-[1rem] ">
        <div className="relative h-[3rem] w-[3rem] overflow-hidden">
          <Image src={course.icon} fill alt={course.type} className="object-contain" />
        </div>
        <h2 className="body-l-bold text-neutral-black">{t(`explore.${course.type}`)}</h2>
        <p className="body-s text-neutral-medium-gray">{t(`explore.${course.type}Intro`)}</p>
        <GoArrowRight size={18} />
      </div>
    </Link>
  );
};

export default CourseCard;
