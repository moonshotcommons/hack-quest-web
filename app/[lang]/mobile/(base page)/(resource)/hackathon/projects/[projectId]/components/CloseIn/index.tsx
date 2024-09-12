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
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
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
    <div className="sticky left-0 top-[4rem] z-[2]  w-full bg-yellow-extra-light  px-[1.25rem] py-[.75rem]">
      <div className="body-xs gap-[12px] text-neutral-off-black">
        <div className="flex h-full items-center justify-between ">
          <div className="flex items-center gap-[8px]">
            {isEnd ? (
              <>
                <Image src={IconLevelPrize} alt="level-prize-icon" width={18} />
                <div>
                  This project won the <span className="body-m-bold">{prize?.name}</span> prize
                </div>
              </>
            ) : (
              <>
                <span className="body-xs text-neutral-medium-gray">{t('hackathonVoting.votingCloseIn')}</span>
              </>
            )}
          </div>
          <Link
            href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
            className="relative flex items-center gap-[.25rem]"
          >
            <span>{t('viewAllProjects')}</span>
            <IoIosArrowForward />
            <div className="absolute bottom-0 left-0 h-[2px] w-full  rounded-[2px] bg-yellow-dark"></div>
          </Link>
        </div>
        {!isEnd && (
          <div className="mt-[.5rem]">
            <CountDown
              time={hackathon?.timeline?.rewardTime}
              countItemClassName="bg-neutral-white body-m-bold"
              formatClassName="body-s"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CloseIn;
