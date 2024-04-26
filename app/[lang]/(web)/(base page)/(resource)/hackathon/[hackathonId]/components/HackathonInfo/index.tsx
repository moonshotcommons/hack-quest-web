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
import WarningIcon from '@/components/Common/Icon/Warning';
import CountDown from '@/components/Web/Business/CountDown';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { useRouter } from 'next-nprogress-bar';
import WarningModal from './WarningModal';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const router = useRouter();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  const [warningOpen, setWarningOpen] = useState(false);

  const handleSubmit = (id: string) => {
    if (hackathon.participation?.team?.creatorId === hackathon.participation?.userId) {
      router.push(`/form${MenuLink.HACKATHON}/${hackathon.id}/submission/${id}`);
    } else {
      setWarningOpen(true);
    }
  };

  const renderButton = () => {
    if (stepIndex < 1) {
      if (userInfo) {
        if (!hackathon.participation?.isRegister) {
          const buttonText = !hackathon.participation?.status ? t('register') : t('continueRegister');
          return (
            <Link href={`/form${MenuLink.HACKATHON}/${hackathon.id}/register`}>
              <Button className="button-text-l h-[60px] w-full bg-yellow-primary uppercase">{buttonText}</Button>
            </Link>
          );
        }
        if (hackathon.participation?.isRegister) {
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
            return (
              <Button className="button-text-l h-[60px] w-full cursor-not-allowed bg-neutral-light-gray uppercase text-neutral-medium-gray hover:scale-[1]">
                {t('youHavesubmitted')}
              </Button>
            );
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
      } else {
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
      }
    } else {
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
    }
  };

  return (
    <Box className="sticky right-0 top-0 flex flex-col  gap-[24px] p-[24px] pb-[20px] text-neutral-off-black">
      {hackathon.participation?.isRegister ||
        (hackathon.participation?.isSubmit && (
          <div className="body-s flex items-center gap-[4px] rounded-[16px] border border-status-error bg-status-error-light p-[16px] text-neutral-medium-gray ">
            <WarningIcon size={16} color="var(--status-error)" />
            {hackathon.participation?.isSubmit ? (
              <span>{t('hackathonDetail.haveSubmission')}</span>
            ) : (
              <span>{t('hackathonDetail.haveRegistered')}</span>
            )}
          </div>
        ))}

      <h1 className="text-h3 ">{hackathon.name}</h1>
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
      <div>
        <div className="body-m mb-[4px] text-neutral-medium-gray">{t('participants')}</div>
        <div className="flex items-center gap-[8px]">
          {/* <div className="flex pl-[10px]">
            {hackathon.hosts?.slice(0, 6)?.map((v, i) => (
              <div
                key={i}
                className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
              >
                <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
              </div>
            ))}
          </div> */}
          <p className="body-m">{`${hackathon.participants.length} ${t('hackathonDetail.usersPartitipated')}`}</p>
        </div>
      </div>
      {renderButton()}

      <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
    </Box>
  );
};

export default HackathonInfo;
