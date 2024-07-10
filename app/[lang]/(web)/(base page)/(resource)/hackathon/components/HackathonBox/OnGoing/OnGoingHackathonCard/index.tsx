'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';
import CountDown from '@/components/Web/Business/CountDown';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Link from 'next/link';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import WarningModal from '../../../HackathonDetail/DetailInfo/WarningModal';
import { FiDownload } from 'react-icons/fi';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
  isDashboard?: boolean;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({ hackathon, isDashboard }) => {
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
    redirectToUrl(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  };
  const { getTotalPrize, getStepIndex, hackathonDownload } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const totalPrize = getTotalPrize(hackathon.rewards);
  const [warningOpen, setWarningOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (id: string) => {
    if (
      hackathon.participation?.team?.creatorId === hackathon.participation?.userId ||
      !Object.keys(hackathon.participation?.team || {}).length
    ) {
      redirectToUrl(`/form${MenuLink.HACKATHON}/${hackathon.id}/submission/${id}`);
    } else {
      setWarningOpen(true);
    }
  };
  const handleRegister = () => {
    if (!userInfo) {
      setAuthModalOpen(true);
      setAuthType(AuthType.LOGIN);
    } else {
      redirectToUrl(`/form${MenuLink.HACKATHON}/${hackathon.id}/register`);
    }
  };
  const renderButton = () => {
    if (stepIndex < 1) {
      if (!hackathon.participation?.isRegister) {
        const buttonText = !hackathon.participation?.status ? t('register') : t('continueRegister');
        return (
          <Button
            className="button-text-l h-[60px] flex-1  bg-yellow-primary p-0 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              handleRegister();
            }}
          >
            {buttonText}
          </Button>
        );
      }
      if (hackathon.participation?.isRegister) {
        if (hackathon.info?.allowSubmission === false || hackathon.allowSubmission === false) {
          return (
            <Button
              size="small"
              type="primary"
              disabled
              className="h-[60px] flex-1 bg-neutral-light-gray font-medium uppercase text-neutral-medium-gray opacity-100"
            >
              {/* {children} */}
              <div>
                <p className="button-text-l">Pending</p>
              </div>
            </Button>
          );
        }

        if (!hackathon.participation.isSubmit) {
          return !hackathon.participation.project?.id ? (
            <Button
              className="button-text-l h-[60px] flex-1   bg-yellow-primary p-0 uppercase"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit('-1');
              }}
            >
              {t('submitNow')}
            </Button>
          ) : (
            <Button
              className="button-text-l h-[60px] flex-1   bg-yellow-primary p-0 uppercase"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit(hackathon.participation?.project?.id as string);
              }}
            >
              {t('continueSubmission')}
            </Button>
          );
        } else {
          return (
            <Button className="button-text-l h-[60px] flex-1   cursor-not-allowed bg-neutral-light-gray p-0 uppercase text-neutral-medium-gray hover:scale-[1]">
              {t('youHavesubmitted')}
            </Button>
          );
        }
      }
    }
    return (
      <Link
        onClick={(e) => {
          e.stopPropagation();
          BurialPoint.track(`hackathon detail View All Projects 按钮点击`);
        }}
        href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
        className="flex-1"
      >
        <Button ghost className="button-text-l h-[60px] w-full border-neutral-black uppercase text-neutral-black">
          {t('viewAllProjects')}
        </Button>
      </Link>
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
      <div className="flex h-full flex-1 flex-col justify-between px-[24px] py-[20px] text-neutral-off-black">
        <div className="flex">
          <h2 className="text-h3 line-clamp-1 ">{hackathon.name}</h2>
        </div>
        <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
          {t('liveNow')}
        </div>
        <div>
          <p className="mb-[8px]">{t('submissionClosesIn')}</p>
          <CountDown time={hackathon.timeline?.submissionClose} />
        </div>
        <div className="body-m flex items-center gap-[80px] text-neutral-medium-gray">
          <div>
            <p className="mb-[8px]">{t('participants')}</p>
            <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.memberCount || 0)}</p>
          </div>

          {isDashboard ? (
            <>
              <div>
                <p className="mb-[8px]">{t('submittedProjects')}</p>
                <p className="body-xl-bold text-neutral-off-black">{separationNumber(hackathon.projectCount || 0)}</p>
              </div>
              <div
                className="w-[40%]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (loading) return;
                  setLoading(true);
                  hackathonDownload(hackathon.id, () => {
                    setLoading(false);
                  });
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
        {/* <div className="flex gap-[16px]">
          {renderButton()}
          <Button className="button-text-l h-[60px] flex-1 flex-shrink-0 border  border-neutral-black  p-0 uppercase">
            {t('learnMore')}
          </Button>
        </div> */}
      </div>
      <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
    </div>
  );
};

export default OnGoingHackathonCard;
