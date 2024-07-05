'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { separationNumber } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CountDown from '@/components/Web/Business/CountDown';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Link from 'next/link';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@/store/zustand/userStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({ hackathon }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );

  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);

  const { redirectToUrl } = useRedirect();
  const goHackathonDetail = () => {
    BurialPoint.track(`hackathon onGoingCard 点击`);
    redirectToUrl(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  };
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getTotalPrize, getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const totalPrize = getTotalPrize(hackathon.rewards);
  const { setTipsModalOpenState } = useGlobalStore(
    useShallow((state) => ({
      setTipsModalOpenState: state.setTipsModalOpenState
    }))
  );
  const handleButton = () => {
    setTipsModalOpenState(true);
  };

  const handleRegister = () => {
    if (!userInfo) {
      mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
      mobileNavModalToggleOpenHandle.toggleOpen();
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
            className="button-text-s h-[2.125rem] flex-1  bg-yellow-primary p-0 uppercase"
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
        if (!hackathon.allowSubmission) {
          return (
            <Button
              size="small"
              type="primary"
              disabled
              className="button-text-s h-[2.125rem] flex-1 bg-neutral-light-gray font-medium uppercase text-neutral-medium-gray opacity-100"
            >
              {/* {children} */}
              <div>
                <p className="button-text-m">Pending</p>
              </div>
            </Button>
          );
        }

        if (!hackathon.participation.isSubmit) {
          return !hackathon.participation.project?.id ? (
            <Button
              className="button-text-s h-[2.125rem] flex-1   bg-yellow-primary p-0 uppercase"
              onClick={(e) => {
                e.stopPropagation();
                handleButton();
              }}
            >
              {t('submitNow')}
            </Button>
          ) : (
            <Button
              className="button-text-s h-[2.125rem] flex-1   bg-yellow-primary p-0 uppercase"
              onClick={(e) => {
                e.stopPropagation();
                handleButton();
              }}
            >
              {t('continueSubmission')}
            </Button>
          );
        } else {
          return (
            <Button className="button-text-s h-[2.125rem] flex-1   cursor-not-allowed bg-neutral-light-gray p-0 uppercase text-neutral-medium-gray hover:scale-[1]">
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
        <Button
          ghost
          className="button-text-s h-[2.125rem] w-full border-neutral-black p-0 uppercase text-neutral-black"
        >
          {t('viewAllProjects')}
        </Button>
      </Link>
    );
  };
  return (
    <div
      className="card-hover flex  w-full flex-col overflow-hidden rounded-[.75rem] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[43%]">
        {<Image src={hackathon.info?.image || ''} fill alt={hackathon.alias} className="object-cover"></Image>}
      </div>
      <div className="flex flex-col justify-between gap-[1rem] px-[1.5rem] py-[1.25rem]">
        <h2 className="text-h3-mob line-clamp-1 text-neutral-off-black">{hackathon.name}</h2>
        <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-status-success px-[.75rem] py-[.25rem] uppercase text-status-success">
          {t('liveNow')}
        </div>
        <div>
          <p className="body-s mb-[.25rem] text-neutral-medium-gray">{t('submissionClosesIn')}</p>
          <CountDown time={hackathon.timeline?.submissionClose} />
        </div>
        <div className="body-s flex flex-col gap-[4px] text-neutral-medium-gray [&>div]:flex [&>div]:items-center [&>div]:justify-between">
          <div>
            <span className="">{t('participants')}</span>
            <span className="body-m-bold text-neutral-off-black">{separationNumber(hackathon.memberCount || 0)}</span>
          </div>
          <div>
            <span className="">{t('totalPrize')}</span>
            <span className="body-m-bold text-neutral-off-black">${separationNumber(totalPrize || 0)}</span>
          </div>
          <div>
            <span className="">{t('host')}</span>
            <span className="body-m-bold text-neutral-off-black underline">{hackathon.info?.host}</span>
          </div>
        </div>
        {/* <div className="flex gap-[.75rem]">
          {renderButton()}
          <Button className="button-text-s h-[2.125rem] flex-1 border border-neutral-black p-0 uppercase">
            {t('learnMore')}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
