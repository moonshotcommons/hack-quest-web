import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { BuildOnWebType } from '../../../constants/type';

interface CourseCardProp {
  course: BuildOnWebType;
  ecosystems: EcosystemType[];
}

const CourseCard: React.FC<CourseCardProp> = ({ course, ecosystems }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Link
      href={course.link}
      className="card-hover flex items-center  justify-between gap-[20px] rounded-[16px] bg-neutral-white p-[24px]"
    >
      <div className="flex flex-1 flex-col gap-[16px] ">
        <h2 className="body-xl-bold text-neutral-black">{t(`explore.${course.type}`)}</h2>
        <p className="body-s text-neutral-medium-gray">{t(`explore.${course.type}Intro`)}</p>
        <div className="flex flex-wrap gap-[4px]">
          {ecosystems.map((v) => (
            <div key={v.id} className="relative h-[16px] w-[16px] overflow-hidden">
              <Image src={v.image} alt={v.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
      <div className="body-m flex flex-shrink-0 items-center gap-[32px] text-neutral-dark-gray">
        <span>{`${course.count} ${t(`explore.${course.type}`)}s`}</span>
        <GoArrowRight size={24} />
      </div>
    </Link>
  );
};

export default CourseCard;
