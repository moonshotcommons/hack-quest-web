'use client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { BuildOnWebType } from '../../../constants/type';
import BaseImage from '@/components/Common/BaseImage';

interface CourseCardProp {
  course: BuildOnWebType;
}

const CourseCard: React.FC<CourseCardProp> = ({ course }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Link
      href={course.link}
      className="card-hover group flex items-center justify-between  gap-[20px] rounded-[16px] bg-neutral-white p-[24px] hover:bg-yellow-hover"
    >
      <div className="relative flex flex-1 flex-col gap-[32px] ">
        <BaseImage
          className="h-[64px] w-[64px] transition-all duration-300 group-hover:opacity-0"
          src={course.icon}
          alt={course.type}
          contain={true}
        />
        <div className="transition-all duration-300 group-hover:translate-y-[-70px]">
          <h2 className="body-l-bold text-neutral-black">{t(`explore.${course.type}`)}</h2>
          <p className="body-s mt-[16px] text-neutral-medium-gray">{t(`explore.${course.type}Intro`)}</p>
        </div>
        <GoArrowRight
          size={24}
          className="absolute bottom-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
};

export default CourseCard;
