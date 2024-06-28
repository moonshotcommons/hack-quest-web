'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { BurialPoint } from '@/helper/burialPoint';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import Box from '../components/Box';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CountDown from '@/components/Web/Business/CountDown';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import WarningModal from './WarningModal';
import { useRedirect } from '@/hooks/router/useRedirect';
import { getRandomAvatars } from '@/helper/random';
import { cn } from '@/helper/utils';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { redirectToUrl } = useRedirect();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const [warningOpen, setWarningOpen] = useState(false);

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
          <Button className="button-text-l h-[60px] w-full bg-yellow-primary uppercase" onClick={handleRegister}>
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
                <p className="button-text-l">Pending</p>
                <p className="body-xs font-light leading-normal">{`You'll be notified by 8:00p.m. on Feb 13, 2024 (GMT+8)`}</p>
              </div>
            </Button>
          );
        }

        if (!hackathon.participation.isSubmit) {
          return !hackathon.participation.project?.id ? (
            <Button
              className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
              onClick={() => handleSubmit('-1')}
            >
              {t('submitNow')}
            </Button>
          ) : (
            <Button
              className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
              onClick={() => handleSubmit(hackathon.participation?.project?.id as string)}
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
              <Link href={`${MenuLink.PROJECTS}/${hackathon.participation?.project?.id}/edit`}>
                <Button type="primary" className="button-text-l h-[60px] w-full uppercase  hover:scale-[1]">
                  {t('hackathonDetail.editSubmission')}
                </Button>
              </Link>
            );
          }
          return (
            <Link href={`${MenuLink.PROJECTS}/${hackathon.participation?.project?.id}`}>
              <Button type="primary" className="button-text-l h-[60px] w-full uppercase  hover:scale-[1]">
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
        <Button ghost className="button-text-l h-[60px] w-full border-neutral-black uppercase text-neutral-black">
          {t('viewAllProjects')}
        </Button>
      </Link>
    );
  };
  return (
    <Box className={cn('sticky right-0 top-[40px] flex flex-col text-neutral-off-black')}>
      {hackathon.participation?.isRegister && (
        <div className="flex h-10 w-full items-center justify-center gap-1 bg-yellow-extra-light">
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 6.23156 13.963 4.53587 12.7127 3.28563C11.4625 2.03539 9.76681 1.33301 7.9987 1.33301ZM8.47204 11.8066C8.40724 11.8655 8.33283 11.9129 8.25204 11.9466C8.09068 12.018 7.90674 12.018 7.74538 11.9466C7.66459 11.9129 7.59018 11.8655 7.52538 11.8066C7.40058 11.6808 7.33102 11.5105 7.33204 11.3333C7.33102 11.1561 7.40058 10.9858 7.52538 10.86C7.68298 10.7039 7.90789 10.6364 8.12538 10.68C8.16953 10.6862 8.21234 10.6997 8.25204 10.72C8.29453 10.7346 8.33488 10.7547 8.37204 10.78C8.40697 10.8046 8.44036 10.8313 8.47204 10.86C8.59386 10.9877 8.66292 11.1568 8.66538 11.3333C8.6664 11.5105 8.59683 11.6808 8.47204 11.8066ZM7.9987 9.33333C8.36689 9.33333 8.66536 9.03486 8.66536 8.66667V4.66667C8.66536 4.29848 8.36689 4 7.9987 4C7.63051 4 7.33203 4.29848 7.33203 4.66667V8.66667C7.33203 9.03486 7.63051 9.33333 7.9987 9.33333Z"
                fill="#FAD81C"
              />
            </svg>
          </span>
          {!hackathon.allowSubmission && (
            <span className="caption-12pt text-neutral-off-black">You have submitted the registration request</span>
          )}
          {hackathon.allowSubmission && hackathon.participation?.isSubmit && (
            <span>{t('hackathonDetail.haveSubmission')}</span>
          )}
          {hackathon.allowSubmission && !hackathon.participation?.isSubmit && (
            <span>{t('hackathonDetail.haveRegistered')}</span>
          )}
        </div>
      )}

      <div className={cn('flex flex-col  gap-4', 'px-6 py-5')}>
        {/* {(hackathon.participation?.isRegister || hackathon.participation?.isSubmit) && hackathon.allowSubmission && (
          <div className="body-s flex items-center gap-[4px] rounded-[16px] border border-status-error bg-status-error-light p-[16px] text-neutral-medium-gray ">
            <WarningIcon size={16} color="var(--status-error)" />
            {hackathon.participation?.isSubmit ? (
              <span>{t('hackathonDetail.haveSubmission')}</span>
            ) : (
              <span>{t('hackathonDetail.haveRegistered')}</span>
            )}
          </div>
        )} */}

        <h1 className="text-h3">{hackathon.name}</h1>
        {stepIndex === 0 ? (
          <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
            {t('liveNow')}
          </div>
        ) : stepIndex === 1 ? (
          <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
            {t('hackathonDetail.submissionReview')}
          </div>
        ) : stepIndex === 2 ? (
          <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
            {t('ended')}
          </div>
        ) : null}

        {stepIndex < 1 && (
          <div>
            <div className="body-m mb-[4px] text-neutral-medium-gray">{t('submissionClosesIn')}</div>
            <CountDown time={hackathon.reviewTime} />
          </div>
        )}
        {hackathon.hosts?.length > 0 && (
          <div>
            <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</div>
            {hackathon.hosts?.map((v, i) => (
              <div key={i} className="flex-row-center mb-[10px] h-[30px]">
                <div className="relative h-[30px] w-[30px]">
                  <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
                </div>
                <span className="body-m pl-[8px] uppercase">{v.name}</span>
              </div>
            ))}
          </div>
        )}

        {hackathon.coHosts?.length > 0 && (
          <div>
            <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonDetail.cohostBy')}</div>
            {hackathon.coHosts?.map((v, i) => (
              <div key={i} className="flex-row-center mb-[10px] h-[30px]">
                <div className="relative h-[30px] w-[30px]">
                  <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
                </div>
                <span className="body-m pl-[8px] uppercase">{v.name}</span>
              </div>
            ))}
          </div>
        )}
        {(hackathon.members?.length > 0 || (hackathon.version === 'old' && hackathon.participants > 0)) && (
          <div>
            <div className="body-m mb-[4px] text-neutral-medium-gray">{t('participants')}</div>
            <div className="flex items-center gap-[8px]">
              <div className="flex pl-[10px]">
                {hackathon.version !== 'old' &&
                  hackathon.members.slice(0, 6)?.map((v, i) => (
                    <div
                      key={i}
                      className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                    >
                      <Image src={v.avatar} alt={v.firstName} fill className="object-contain"></Image>
                    </div>
                  ))}
                {hackathon.version === 'old' &&
                  getRandomAvatars(hackathon.participants < 6 ? hackathon.participants : 6).map((v, i) => (
                    <div
                      key={i}
                      className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                    >
                      <Image src={v.url} alt={'avatar'} fill className="object-contain"></Image>
                    </div>
                  ))}
              </div>

              <p className="body-m">{`${
                hackathon.version === 'old' ? hackathon.participants : hackathon.members?.length || 0
              } ${t('hackathonDetail.usersPartitipated')}`}</p>
            </div>
          </div>
        )}

        {renderButton()}

        <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
      </div>
    </Box>
  );
};

export default HackathonInfo;
