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
    <div className="sticky left-0 top-0 z-[2] h-[64px] w-full rounded-[4px] bg-yellow-extra-light px-[28px]">
      <div className="body-l relative flex h-full items-center justify-center gap-[12px] text-neutral-off-black">
        <Image src={IconLevelPrize} alt="level-prize-icon" width={30} />
        <span>
          This project won the <span className="body-xl-bold">1st</span> prize
        </span>
        <Link href={`${MenuLink.PROJECTS}`} className="absolute right-[28px] top-0 flex h-full items-center">
          <div className="relative flex items-center gap-[8px]">
            <span>{t('viewAllProjects')}</span>
            <IoIosArrowForward />
            <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CloseIn;
