'use client';
import { FC, useState } from 'react';
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
import { FiDownload } from 'react-icons/fi';
import { ImageWithFallback } from '../ImageWithFallback';
import DownloadModal from '@/components/hackathon/download-modal';
import dayjs from 'dayjs';

interface HackathonCardProps {
  hackathon: HackathonType;
  isVoting?: boolean;
  isOrganizer?: boolean;
}

export const HackathonCard: FC<HackathonCardProps> = ({ hackathon, isVoting, isOrganizer }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize, hackathonDownload } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  const [loading, setLoading] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const isEnd = dayjs.utc(hackathon.timeline?.rewardTime).local().isBefore(new Date());
  const handleDownload = (type: 'csv' | 'xlsx') => {
    if (loading) return;
    setLoading(true);
    hackathonDownload(
      {
        id: hackathon.id,
        type
      },
      () => {
        setDownloadOpen(false);
        setLoading(false);
      }
    );
  };
  return (
    <Link href={`${MenuLink.PROJECTS}/hackathons/${hackathon.alias}`}>
      <div className="card-hover flex  w-full flex-col overflow-hidden rounded-[16px] bg-neutral-white ">
        <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
          <ImageWithFallback src={hackathon.info?.image || ''} fill alt={hackathon.alias} className="object-cover" />
        </div>
        <div className="flex h-[206px] flex-col justify-between px-[20px] py-[20px]">
          <h2 className="text-h3-mob line-clamp-1 text-neutral-off-black">{hackathon.name}</h2>
          {isVoting ? (
            <>
              <div>
                <p className="body-s mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.votingCloseIn')}</p>
                <CountDown time={hackathon.timeline?.rewardTime} countItemClassName="body-m-bold" />
              </div>
              <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
                <div>
                  <span className="">{t('hackathonVoting.votingProjects')}</span>
                  <span className="body-m-bold text-neutral-off-black">{hackathon.projectCount}</span>
                </div>
                <div>
                  <span className="">{t('hackathonVoting.yourRemainingVotes')}</span>
                  <span className="body-m-bold text-neutral-off-black">{hackathon.remainingVote}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {isEnd ? (
                <div className="body-s-bold w-fit rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
                  closed {moment(hackathon.timeline?.rewardTime).format('ll')}
                </div>
              ) : (
                <div className="body-s-bold w-fit rounded-[8px] border-[2px] border-status-success-dark px-[12px] py-[4px] uppercase text-status-success-dark">
                  Live now
                </div>
              )}
              <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
                <div>
                  <span className="">{t('participants')}</span>
                  <span className="body-m-bold text-neutral-off-black">
                    {separationNumber(hackathon.memberCount || 0)}
                  </span>
                </div>
                <div>
                  <span className="">{t('totalPrize')}</span>
                  <span className="body-m-bold text-neutral-off-black">{`${separationNumber(totalPrize || 0)} ${hackathon.rewards?.[0]?.currency || 'USD'}`}</span>
                </div>
                {isOrganizer ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setDownloadOpen(true);
                    }}
                  >
                    <span className="">{t('hackathonDetail.registrationData')}</span>
                    <div className="underline-m flex items-center gap-[4px] text-neutral-off-black underline">
                      <FiDownload />
                      <span>Download</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="">{t('host')}</span>
                    <span className="body-m-bold line-clamp-1 text-neutral-off-black underline">
                      {hackathon.info?.host}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} handleDownload={handleDownload} />
      </div>
    </Link>
  );
};
