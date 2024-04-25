'use client';
import React, { useContext } from 'react';
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

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Box className="sticky right-0 top-0 flex flex-col  gap-[24px] p-[24px] pb-[20px] text-neutral-off-black">
      <div className="body-s flex items-center gap-[4px] rounded-[16px] border border-status-error bg-status-error-light p-[16px] text-neutral-medium-gray ">
        <WarningIcon size={16} color="var(--status-error)" />
        <span>{t('hackathonDetail.haveRegistered')}</span>
        {/* <span>{t('hackathonDetail.haveSubmission')}</span> */}
      </div>
      <h1 className="text-h3 ">{hackathon.name}</h1>
      <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
        {t('liveNow')}
      </div>
      <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
        {t('hackathonDetail.submissionReview')}
      </div>
      <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
        {t('ended')}
      </div>
      <div>
        <div className="body-m mb-[4px] text-neutral-medium-gray">{t('submissionClosesIn')}</div>
        <CountDown time={hackathon.endTime} />
      </div>
      <div>
        <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</div>
        {hackathon.hosts.map((v, i) => (
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
        {hackathon.hosts.map((v, i) => (
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
          <div className="flex pl-[10px]">
            {hackathon.hosts?.slice(0, 6)?.map((v, i) => (
              <div
                key={i}
                className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
              >
                <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
              </div>
            ))}
          </div>
          <p className="body-m">{`${hackathon.hosts.length} ${t('usersPartitipated')}`}</p>
        </div>
      </div>

      <Link href={`/form/hackathon/${hackathon.id}/register`}>
        <Button
          className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
          onClick={() => {
            BurialPoint.track(`hackathon detail Apply Now 按钮点击`);
          }}
        >
          {/* {t('submitNow')} */}
          {t('register')}
        </Button>
      </Link>
      <Link href={`/form/hackathon/${hackathon.id}/register`}>
        <Button
          className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
          onClick={() => {
            BurialPoint.track(`hackathon detail Apply Now 按钮点击`);
          }}
        >
          {/* {t('submitNow')} */}
          {t('continueSubmission')}
        </Button>
      </Link>
      <Link href={`/form/hackathon/${hackathon.id}/submission`}>
        <Button
          className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
          onClick={() => {
            BurialPoint.track(`hackathon detail Apply Now 按钮点击`);
          }}
        >
          {t('submitNow')}
          {/* {T('continueSubmission')} */}
        </Button>
      </Link>

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
    </Box>
  );
};

export default HackathonInfo;
