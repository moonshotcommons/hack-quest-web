'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { HackathonStatus, HackathonType } from '@/service/webApi/resourceStation/type';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';
import CountDown from '@/components/Web/Business/CountDown';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import WarningModal from '../../../HackathonDetail/DetailInfo/WarningModal';
import { FiDownload } from 'react-icons/fi';
import { CiEdit, CiSettings } from 'react-icons/ci';
import { HackathonManageType } from '@/app/[lang]/(web)/(other)/hackathon-manage/constants/type';
import DownloadModal from '@/components/hackathon/download-modal';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
  isOrganizer?: boolean;
  showManage?: boolean;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({ hackathon, isOrganizer, showManage }) => {
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { redirectToUrl } = useRedirect();
  const goHackathonDetail = () => {
    redirectToUrl(`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`);
  };
  const { getTotalPrize, hackathonDownload, getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const totalPrize = getTotalPrize(hackathon.rewards);
  const [warningOpen, setWarningOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const renderIcon = () => {
    if (showManage || isOrganizer) {
      return (
        <div className="absolute right-[20px] top-[20px] flex gap-[10px] text-neutral-black">
          {showManage && (
            <div
              className="p-[6px]  transition-all hover:scale-[1.2]"
              onClick={(e) => {
                e.stopPropagation();
                redirectToUrl(`${MenuLink.HACKATHON_MANAGER}/${hackathon.alias}/${HackathonManageType.OVERVIEW}`);
              }}
            >
              <CiSettings size={26} />
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
              <CiEdit size={26} className="" />
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
      className="card-hover flex h-[322px] overflow-hidden rounded-[16px] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[571px] flex-shrink-0 bg-[#d9d9d9]/30">
        <Image src={hackathon.info?.image || ''} fill alt={hackathon.alias} className="object-cover"></Image>
      </div>
      <div className="relative flex h-full flex-1 flex-col justify-between px-[24px] py-[20px] text-neutral-off-black">
        {renderIcon()}
        <div className="w-[90%]">
          <h2 className="text-h3 line-clamp-1">{hackathon.name}</h2>
        </div>
        <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
          {t(hackathon.status === HackathonStatus.PUBLISH ? 'liveNow' : 'reivew')}
        </div>
        <div>
          <p className="mb-[8px]">{stepIndex <= 0 ? 'Registration Closes In' : 'Submission Closes In'}</p>
          <CountDown
            time={stepIndex <= 0 ? hackathon.timeline?.registrationClose : hackathon.timeline?.submissionClose}
          />
        </div>
        <div className="body-m flex items-center gap-[80px] text-neutral-medium-gray">
          <div>
            <p className="mb-[8px]">{t('participants')}</p>
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.memberCount || 0)}</p>
          </div>

          {isOrganizer ? (
            <>
              <div>
                <p className="mb-[8px]">{t('submittedProjects')}</p>
                <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.projectCount || 0)}</p>
              </div>
              <div
                className="w-[40%]"
                onClick={(e) => {
                  e.stopPropagation();
                  setDownloadOpen(true);
                }}
              >
                <p className="mb-[8px]">{t('hackathonDetail.registrationData')}</p>
                <div className="relative flex h-[36px] items-center gap-[8px] text-[24px] text-neutral-off-black underline">
                  <FiDownload />
                  <span>Download</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="mb-[8px]">{t('totalPrize')}</p>
                <p className="body-xl-bold text-neutral-off-black">{`${separationNumber(totalPrize || 0)} ${hackathon.rewards?.[0]?.currency || 'USD'}`}</p>
              </div>
              <div className="w-[40%]">
                <p className="mb-[8px]">{t('host')}</p>
                <div className="body-xl-bold  relative h-[36px] text-neutral-off-black underline">
                  <p className="absolute left-0 top-0 w-full truncate">{hackathon.info?.host || '-'}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} handleDownload={handleDownload} />
    </div>
  );
};

export default OnGoingHackathonCard;
