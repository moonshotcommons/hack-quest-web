import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import React, { useContext } from 'react';
import IconHackathon from '@/public/images/hackathon/icon_hackathon.png';
import IconPrizeTrack from '@/public/images/hackathon/icon_prize_track.png';
import IconHackathonTrack from '@/public/images/hackathon/icon_hackathon_track.png';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { DiGithubBadge } from 'react-icons/di';
import { IoIosArrowForward } from 'react-icons/io';
import { cn } from '@/helper/utils';
import { ProjectDetailContext } from '../../../../../constants/type';
import InvalidTooltip from './InvalidTooltip';

interface OverviewProp {}

const Overview: React.FC<OverviewProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { project, hackathon } = useContext(ProjectDetailContext);
  const githubLink = project.addition?.githubLink || '';
  const isOpenSource = project.addition?.isOpenSource;

  const showGithubModule = isOpenSource && githubLink;

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex gap-[24px]">
        <div className="relative h-[124px] w-[124px] flex-shrink-0 overflow-hidden rounded-[24px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
          <Image src={project.logo} alt={project.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-[16px]">
          <h1 className={`text-h2 flex ${project.invalid ? 'text-status-error-dark' : 'text-neutral-off-black'} `}>
            <span>{project.name}</span>
            {project.invalid && <InvalidTooltip invalidReason={project.invalidReason} />}
          </h1>
          <p className="line-clamp-2" title={project.detail?.oneLineIntro}>
            {project.detail?.oneLineIntro}
          </p>
        </div>
      </div>
      <div className="flex h-[45px] [&>div]:flex [&>div]:h-full [&>div]:items-center [&>div]:gap-[12px]">
        <div className={cn('flex w-fit pr-8', showGithubModule ? 'max-w-[25%]' : '')}>
          <Image src={IconHackathon} width={26} alt="hackathon-icon" />
          <div className="flex flex-1 flex-col truncate">
            <p className="body-xs text-neutral-medium-gray">{t('navbar.resources.hackathon')}</p>
            {(hackathon?.alias || project.hackathonId) && (
              <Link
                href={`${MenuLink.EXPLORE_HACKATHON}/${hackathon?.alias || project.hackathonId}`}
                title={project.hackathonName}
                className="underline-m w-full whitespace-nowrap"
              >
                {project.hackathonName}
              </Link>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex w-fit border-l border-neutral-rich-gray px-[32px]',
            showGithubModule ? 'max-w-[25%]' : ''
          )}
        >
          <Image src={IconPrizeTrack} width={24} alt="prize-icon" />
          <div className="flex flex-1 flex-col">
            <p className="body-xs text-neutral-medium-gray">{t('projectsDetail.prizeTrack')}</p>
            <p className="line-clamp-1 w-full" title={project.prizeTrack?.split(',').join(', ')}>
              {project.prizeTrack?.split(',').join(', ') || '-'}
            </p>
          </div>
        </div>

        <div
          className={cn(
            'flex w-fit  border-l border-neutral-rich-gray pl-[32px]',
            showGithubModule ? 'max-w-[25%] pr-[32px]' : ''
          )}
        >
          <Image src={IconHackathonTrack} width={31} alt="hackathon-track-icon" />
          <div className="flex-1">
            <p className="body-xs text-neutral-medium-gray">{t('projectsDetail.hackathonTrack')}</p>
            <p className="line-clamp-1" title={project.tracks?.join(', ')}>
              {project.tracks?.join(', ') || '-'}
            </p>
          </div>
        </div>
        {showGithubModule && (
          <div className="max-w-[25%] border-l  border-neutral-rich-gray pl-[32px]">
            <DiGithubBadge size={40} />
            <div className="">
              <p className="body-xs text-neutral-medium-gray ">{t('projectsDetail.openSource')}</p>
              <Link href={githubLink} target="_blank" className="relative flex items-center gap-[8px]">
                <span>Github</span>
                <IoIosArrowForward />
                <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
