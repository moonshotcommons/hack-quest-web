'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { exportToExcel, separationNumber } from '@/helper/utils';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import CountDown from '@/components/Web/Business/CountDown';
import { FiDownload } from 'react-icons/fi';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

interface PastHackathonCardProps {
  hackathon: HackathonType;
  isVoting?: boolean;
  isDashboard?: boolean;
}

const PastHackathonCard: FC<PastHackathonCardProps> = ({ hackathon, isVoting, isDashboard }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  const [loading, setLoading] = useState(false);
  const downloadMember = () => {
    if (loading) return;
    setLoading(true);
    webApi.resourceStationApi
      .getHackathonMember(hackathon.id)
      .then((res) => {
        const data = res.data?.map((v) => {
          return {
            ...v,
            team: JSON.stringify(v.team)
          };
        });
        exportToExcel(data, 'members');
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Link
      href={isVoting ? `${MenuLink.HACKATHON_VOTING}/${hackathon.alias}` : `${MenuLink.HACKATHON}/${hackathon.alias}`}
    >
      <div className="card-hover flex  w-full flex-col overflow-hidden rounded-[16px] bg-neutral-white ">
        <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
          <Image src={hackathon.info?.image || ''} fill alt={hackathon.alias} className="object-cover"></Image>
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
              <div className="body-s-bold w-fit rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
                closed {moment(hackathon.timeline?.rewardTime).format('ll')}
              </div>
              <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
                <div>
                  <span className="">{t('participants')}</span>
                  <span className="body-m-bold text-neutral-off-black">
                    {separationNumber(hackathon.memberCount || 0)}
                  </span>
                </div>
                <div>
                  <span className="">{t('totalPrize')}</span>
                  <span className="body-m-bold text-neutral-off-black">${separationNumber(totalPrize || 0)}</span>
                </div>
                {isDashboard ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadMember();
                    }}
                  >
                    <span className="">{t('hackathonDetail.registrationData')}</span>
                    <div className="underline-m flex items-center gap-[4px] text-neutral-off-black underline">
                      <FiDownload />
                      <span>Download</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="">{t('host')}</span>
                    <span className="body-m-bold text-neutral-off-black underline">{hackathon.info?.host}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PastHackathonCard;
