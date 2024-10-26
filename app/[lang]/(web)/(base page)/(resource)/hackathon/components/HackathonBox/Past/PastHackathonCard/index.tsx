'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import CountDown from '@/components/Web/Business/CountDown';
import { FiDownload } from 'react-icons/fi';
import { CiEdit, CiSettings } from 'react-icons/ci';
import { HackathonManageType } from '@/app/[lang]/(web)/(other)/hackathon-manage/constants/type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import DownloadModal from '@/components/hackathon/download-modal';

interface PastHackathonCardProps {
  hackathon: HackathonType;
  isVoting?: boolean;
  isOrganizer?: boolean;
  showManage?: boolean;
}

const PastHackathonCard: FC<PastHackathonCardProps> = ({ hackathon, isVoting, isOrganizer, showManage }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize, hackathonDownload } = useDealHackathonData();
  const totalPrize = getTotalPrize(hackathon.rewards);
  const { redirectToUrl } = useRedirect();
  const [loading, setLoading] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const goHackathonDetail = () => {
    if (isVoting && !userInfo) {
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    const path = isVoting
      ? `${MenuLink.HACKATHON_VOTING}/${hackathon.alias}`
      : `${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`;
    redirectToUrl(path);
  };
  const renderIcon = () => {
    if (showManage || isOrganizer) {
      return (
        <div className="absolute right-[10px] top-[10px] z-[2] flex gap-[5px] rounded-[6px] bg-neutral-light-gray p-[4px] text-neutral-black opacity-50 transition-all hover:opacity-100">
          {showManage && (
            <div
              className="p-[6px]  transition-all hover:scale-[1.2]"
              onClick={(e) => {
                e.stopPropagation();
                redirectToUrl(`${MenuLink.HACKATHON_MANAGER}/${hackathon.alias}/${HackathonManageType.OVERVIEW}`);
              }}
            >
              <CiSettings size={20} />
            </div>
          )}
          {isOrganizer && (
            <div
              className="p-[6px]  transition-all hover:scale-[1.2]"
              onClick={(e) => {
                e.stopPropagation();
                redirectToUrl(`${MenuLink.HACKATHON_ORGANIZER}/${hackathon.alias}`);
              }}
            >
              <CiEdit size={20} />
            </div>
          )}
        </div>
      );
    }
    return null;
  };
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
    <div
      className="card-hover flex  w-full flex-col overflow-hidden rounded-[16px] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
        {renderIcon()}
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
            <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-4">
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
                <div>
                  <span className="">{t('host')}</span>
                  <span className="body-m-bold line-clamp-1 flex-1 flex-shrink-0 text-right text-neutral-off-black underline">
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
  );
};

export default PastHackathonCard;
