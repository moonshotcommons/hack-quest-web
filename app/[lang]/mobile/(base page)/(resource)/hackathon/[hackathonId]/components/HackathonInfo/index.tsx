'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import WarningIcon from '@/components/Common/Icon/Warning';
import CountDown from '@/components/Web/Business/CountDown';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { getRandomAvatars } from '@/helper/random';
import { useRedirect } from '@/hooks/router/useRedirect';
import { NavType } from '@/components/Mobile/MobLayout/constant';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const { setTipsModalOpenState } = useGlobalStore(
    useShallow((state) => ({
      setTipsModalOpenState: state.setTipsModalOpenState
    }))
  );
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);

  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);

  const { redirectToUrl } = useRedirect();

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
            className="button-text-m h-[3rem] w-full bg-yellow-primary uppercase"
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
              className=" h-[60px] w-full bg-neutral-light-gray font-medium uppercase text-neutral-medium-gray opacity-100"
            >
              {/* {children} */}
              <div>
                <p className="button-text-m">Pending</p>
                <p className="button-text-m text-[10px] font-light leading-normal">{`You'll be notified by 6:30p.m. on June 28th, 2024`}</p>
              </div>
            </Button>
          );
        }

        if (!hackathon.participation.isSubmit) {
          return !hackathon.participation.project?.id ? (
            <Button
              className="button-text-m h-[3rem] w-full bg-yellow-primary uppercase"
              onClick={() => setTipsModalOpenState(true)}
            >
              {t('submitNow')}
            </Button>
          ) : (
            <Button
              className="button-text-m h-[3rem] w-full bg-yellow-primary uppercase"
              onClick={() => setTipsModalOpenState(true)}
            >
              {t('continueSubmission')}
            </Button>
          );
        } else {
          if (
            !hackathon.participation?.team ||
            hackathon.participation?.team?.creatorId === hackathon.participation?.userId
          ) {
            return (
              <Button
                type="primary"
                className="button-text-m h-[3rem] w-full uppercase  hover:scale-[1]"
                onClick={() => setTipsModalOpenState(true)}
              >
                {t('hackathonDetail.editSubmission')}
              </Button>
            );
          }
          return (
            <Link href={`${MenuLink.PROJECTS}/${hackathon.participation?.project?.id}`}>
              <Button type="primary" className="button-text-m h-[3rem] w-full uppercase  hover:scale-[1]">
                {t('hackathonDetail.viewTeamProject')}
              </Button>
            </Link>
          );
        }
      }
    }
    return (
      <Link
        onClick={() => {
          BurialPoint.track(`hackathon detail View All Projects 按钮点击`);
        }}
        href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
      >
        <Button ghost className="button-text-m h-[3rem] w-full bg-neutral-black uppercase text-neutral-white">
          {t('viewAllProjects')}
        </Button>
      </Link>
    );
  };

  return (
    <div className="flex flex-col  gap-[1.25rem]  text-neutral-off-black">
      {(hackathon.participation?.isRegister || hackathon.participation?.isSubmit) && (
        <div className="body-s flex items-center justify-center gap-[.25rem] rounded-[1rem] border border-yellow-dark bg-yellow-extra-light p-[1rem] text-neutral-off-black ">
          <WarningIcon size={16} color="var(--yellow-dark)" />
          {!hackathon.allowSubmission && <span>You have submitted the registration request</span>}
          {hackathon.allowSubmission && hackathon.participation?.isSubmit && (
            <span>{t('hackathonDetail.haveSubmission')}</span>
          )}
          {hackathon.allowSubmission && !hackathon.participation?.isSubmit && (
            <span>{t('hackathonDetail.haveRegistered')}</span>
          )}
        </div>
      )}
      <h1 className="text-h3-mob ">{hackathon.name}</h1>
      {stepIndex < 1 && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('submissionClosesIn')}</div>
          <CountDown time={hackathon.reviewTime} />
        </div>
      )}
      {stepIndex === 0 ? (
        <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-status-success px-[.75rem] py-[.25rem] uppercase text-status-success">
          {t('liveNow')}
        </div>
      ) : stepIndex === 1 ? (
        <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-status-success px-[.75rem] py-[.25rem] uppercase text-status-success">
          {t('hackathonDetail.submissionReview')}
        </div>
      ) : stepIndex === 2 ? (
        <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-neutral-medium-gray px-[.75rem] py-[.25rem] uppercase text-neutral-medium-gray">
          {t('ended')}
        </div>
      ) : null}

      {hackathon.hosts?.length > 0 && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</div>
          {hackathon.hosts?.map((v, i) => (
            <div key={i} className="flex-row-center mb-[.625rem] h-[1.5rem]">
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
              </div>
              <span className="body-s pl-[.5rem] uppercase">{v.name}</span>
            </div>
          ))}
        </div>
      )}

      {hackathon.coHosts?.length > 0 && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonDetail.cohostBy')}</div>
          {hackathon.coHosts?.map((v, i) => (
            <div key={i} className="flex-row-center mb-[.625rem] h-[1.5rem]">
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
              </div>
              <span className="body-s pl-[.5rem] uppercase">{v.name}</span>
            </div>
          ))}
        </div>
      )}
      {(hackathon.members?.length > 0 || (hackathon.version === 'old' && hackathon.participants > 0)) && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('participants')}</div>
          <div className="flex items-center gap-[.5rem]">
            <div className="flex pl-[10px]">
              {hackathon.version !== 'old' &&
                hackathon.members.slice(0, 6)?.map((v, i) => (
                  <div
                    key={i}
                    className="relative ml-[-0.625rem] h-[2.625rem] w-[2.625rem] overflow-hidden rounded-[50%] border border-neutral-white"
                  >
                    <Image src={v.avatar} alt={v.firstName} fill className="object-contain"></Image>
                  </div>
                ))}
              {hackathon.version === 'old' &&
                getRandomAvatars(hackathon.participants < 6 ? hackathon.participants : 6).map((v, i) => (
                  <div
                    key={i}
                    className="relative ml-[-0.625rem] h-[2.625rem] w-[2.625rem] overflow-hidden rounded-[50%] border border-neutral-white"
                  >
                    <Image src={v.url} alt={'avatar'} fill className="object-contain"></Image>
                  </div>
                ))}
            </div>
            <p className="body-s">{`${
              hackathon.version === 'old' ? hackathon.participants : hackathon.members?.length || 0
            } ${t('hackathonDetail.usersParticipated')}`}</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 z-[10] w-full px-[1.25rem] pb-[1.25rem]">{renderButton()}</div>
    </div>
  );
};

export default HackathonInfo;
