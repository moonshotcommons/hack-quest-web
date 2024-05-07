'use client';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import React, { useContext } from 'react';
import IconLevelPrize from '@/public/images/hackathon/icon_level_prize.png';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';

interface CloseInProp {
  project: ProjectType;
}

const CloseIn: React.FC<CloseInProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="sticky left-0 top-[4rem] z-[2] h-[3.125rem] w-full  bg-yellow-extra-light px-[1.25rem]">
      <div className="body-xs relative flex h-full items-center justify-between gap-[12px] text-neutral-off-black">
        <div className="flex items-center gap-[8px]">
          <Image src={IconLevelPrize} alt="level-prize-icon" width={18} />
          <span>
            This project won the <span className="body-m-bold">1st</span> prize
          </span>
        </div>
        <Link href={`${MenuLink.PROJECTS}`} className="relative flex items-center gap-[.25rem]">
          <span>{t('viewAllProjects')}</span>
          <IoIosArrowForward />
          <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
        </Link>
      </div>
    </div>
  );
};

export default CloseIn;
