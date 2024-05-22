'use client';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import IconLevelPrize from '@/public/images/hackathon/icon_level_prize.png';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import dayjs from '@/components/Common/Dayjs';
import CountDown from '@/components/Web/Business/CountDown';

interface CloseInProp {
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
}

const CloseIn: React.FC<CloseInProp> = ({ project, rankInfo, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const isEnd = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.rewardTime);
  }, [hackathon]);
  if (isEnd && (!project.vote || rankInfo?.rank !== 1)) return null;
  return (
    <div className="sticky left-0 top-0 z-[2] h-[64px] w-full rounded-[4px] bg-yellow-extra-light px-[28px]">
      <div className="body-l relative flex h-full items-center  justify-center gap-[12px] text-neutral-off-black">
        {project.vote && isEnd ? (
          <>
            <Image src={IconLevelPrize} alt="level-prize-icon" width={30} />
            <div>
              This project won the <span className="body-xl-bold">1st</span> prize
            </div>
          </>
        ) : (
          <>
            <span>{t('hackathonVoting.votingCloseIn')}</span>
            <CountDown time={hackathon?.rewardTime} countItemClassName={'bg-neutral-white'} />
          </>
        )}
        <Link href={`${MenuLink.PROJECTS}`} className="absolute right-[28px] top-0 flex h-full items-center">
          <div className="relative flex items-center gap-[8px]">
            <span>{t('viewAllProjects')}</span>
            <IoIosArrowForward size={24} />
            <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CloseIn;
