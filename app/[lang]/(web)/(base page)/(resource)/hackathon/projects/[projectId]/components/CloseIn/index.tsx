'use client';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import IconLevelPrize from '@/public/images/hackathon/icon_level_prize.png';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import CountDown from '@/components/Web/Business/CountDown';
import { ProjectDetailContext } from '../../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface CloseInProp {}

const CloseIn: React.FC<CloseInProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project, hackathon } = useContext(ProjectDetailContext);
  const { getStepIndex } = useDealHackathonData();
  const isEnd = useMemo(() => {
    return getStepIndex(hackathon) === 4;
  }, [hackathon, getStepIndex]);
  const prize = useMemo(() => {
    return project.rewards?.find((v) => v.winner);
  }, [project]);
  if (isEnd && !prize) return null;
  return (
    <div className="sticky left-0 top-0 z-[2] h-[61px] w-full rounded-[4px] bg-yellow-extra-light px-[28px]">
      <div className="body-l relative flex h-full items-center  justify-center gap-[12px] text-neutral-off-black">
        {isEnd ? (
          <>
            <Image src={IconLevelPrize} alt="level-prize-icon" width={30} />
            <div>
              This project won the <span className="body-xl-bold">{prize?.name}</span> prize
            </div>
          </>
        ) : (
          <>
            <span className="body-s text-neutral-medium-gray">{t('hackathonVoting.votingCloseIn')}</span>
            <CountDown
              time={hackathon?.timeline?.rewardTime}
              countItemClassName={'bg-neutral-white body-l-bold'}
              formatClassName="body-m"
            />
          </>
        )}
        <Link
          href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
          className="absolute right-[28px] top-0 flex h-full items-center"
        >
          <div className="body-m relative flex items-center gap-[8px] text-neutral-off-black">
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
