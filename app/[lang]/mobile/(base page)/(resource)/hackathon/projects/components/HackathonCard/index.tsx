'use client';

import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import CountDown from '@/components/Web/Business/CountDown';
import { ImageWithFallback } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/projects/components/ImageWithFallback';
import dayjs from 'dayjs';

interface HackathonCardProps {
  hackathon: HackathonType;
  isVoting?: boolean;
  isOrganizer?: boolean;
}

export const HackathonCard: FC<HackathonCardProps> = ({ hackathon, isVoting, isOrganizer }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);

  const isEnd = dayjs.utc(hackathon.timeline?.rewardTime).local().isBefore(new Date());

  return (
    <Link href={`${MenuLink.PROJECTS}/hackathons/${hackathon.alias}`}>
      <div className="card-hover flex h-[7.5rem] overflow-hidden rounded-[.75rem] bg-neutral-white ">
        <div className="relative h-full w-[7.5rem] bg-neutral-light-gray">
          <ImageWithFallback src={hackathon.info?.image || ''} fill alt={hackathon.alias} className="object-cover" />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between p-[.75rem] text-neutral-off-black">
          <h2 className="body-s line-clamp-1 text-neutral-off-black">{hackathon.name}</h2>
          {isVoting ? (
            <>
              <div>
                <p className="caption-10pt mb-[.25rem] text-neutral-medium-gray">
                  {t('hackathonVoting.votingCloseIn')}
                </p>
                <CountDown
                  time={hackathon.timeline?.rewardTime}
                  countItemClassName="caption-12pt px-[.25rem] py-[.0625rem]"
                  className="gap-[.5rem]"
                  formatClassName="caption-10pt"
                />
              </div>
              <div className="caption-10pt flex items-center gap-[1.25rem] text-neutral-medium-gray">
                <div>
                  <p className="mb-[.25rem]">{t('hackathonVoting.votingProjects')}</p>
                  <p className=" text-neutral-off-black">{hackathon.projectCount}</p>
                </div>
                <div>
                  <p className="mb-[.25rem]">{t('hackathonVoting.yourRemainingVotes')}</p>
                  <p className=" text-neutral-off-black">{hackathon.remainingVote}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {isEnd ? (
                <div className="caption-10pt w-fit rounded-[.5rem] border-[.0625rem] border-neutral-medium-gray px-[.5rem] py-[.25rem] uppercase text-neutral-medium-gray">
                  closed {moment(hackathon.timeline?.rewardTime).format('ll')}
                </div>
              ) : (
                <div className="caption-10pt w-fit rounded-[.5rem] border-[.0625rem] border-status-success-dark px-[.5rem] py-[.25rem] uppercase text-status-success-dark">
                  Live now
                </div>
              )}
              <div className="caption-10pt flex items-center justify-between text-neutral-medium-gray">
                <div>
                  <p className="mb-[.25rem]">{t('participants')}</p>
                  <p className="text-neutral-off-black">{separationNumber(hackathon.memberCount || 0)}</p>
                </div>
                <div>
                  <p className="mb-[.25rem]">{t('totalPrize')}</p>
                  <p className="text-neutral-off-black">{`${separationNumber(totalPrize || 0)} ${hackathon.rewards?.[0]?.currency || 'USD'}`}</p>
                </div>
                <div className="w-[33%]">
                  <p className="mb-[.25rem]">{t('host')}</p>
                  <p className="truncate text-neutral-off-black underline">{hackathon.info?.host}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
