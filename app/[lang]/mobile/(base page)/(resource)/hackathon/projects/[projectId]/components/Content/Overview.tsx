import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Image from 'next/image';
import React, { useContext } from 'react';
import IconHackathon from '@/public/images/hackathon/icon_hackathon.png';
import IconPrizeTrack from '@/public/images/hackathon/icon_prize_track.png';
import IconHackathonTrack from '@/public/images/hackathon/icon_hackathon_track.png';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { DiGithubBadge } from 'react-icons/di';
import { IoIosArrowForward } from 'react-icons/io';

interface OverviewProp {
  project: ProjectType;
  hackathon: HackathonType;
}

const Overview: React.FC<OverviewProp> = ({ project, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  return (
    <div className="flex flex-col gap-[1.75rem]">
      <div className="flex gap-[.75rem]">
        <div className="relative h-[6rem] w-[6rem] flex-shrink-0 overflow-hidden rounded-[1rem] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
          <Image src={project.thumbnail} alt={project.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-[.25rem]">
          <h1 className="text-h3-mob text-neutral-off-black">{project.name}</h1>
          <p className="line-clamp-3" title={project.description}>
            {project.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[1rem] [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:gap-[.75rem]">
        <div className="">
          <div className="flex w-[40px] justify-center">
            <Image src={IconHackathon} width={26} alt="hackathon-icon" />
          </div>

          <div className="flex-1">
            <p className="body-xs text-neutral-medium-gray">{t('navbar.resources.hackathon')}</p>
            <Link
              href={`${MenuLink.HACKATHON}/${hackathon?.alias}`}
              title={project.hackathonName}
              className="underline-s w-full"
            >
              {project.hackathonName}
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex w-[40px] justify-center">
            <Image src={IconPrizeTrack} width={24} alt="prize-icon" />
          </div>

          <div className="">
            <p className="body-s text-neutral-medium-gray">{t('projectsDetail.prizeTrack')}</p>
            <p className="body-s line-clamp-1 w-full" title={project.prizeTrack?.split(',').join(', ')}>
              {project.prizeTrack?.split(',').join(', ') || '-'}
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex w-[40px] justify-center">
            <Image src={IconHackathonTrack} width={31} alt="hackathon-track-icon" />
          </div>

          <div className="">
            <p className="body-xs text-neutral-medium-gray">{t('projectsDetail.hackathonTrack')}</p>
            <p className="body-s line-clamp-1" title={project.tracks?.join(', ')}>
              {project.tracks?.join(', ')}
            </p>
          </div>
        </div>
        {project.githubLink && (
          <div>
            <div className="flex w-[40px] justify-center">
              <DiGithubBadge size={40} />
            </div>
            <div className="">
              <p className="body-xs text-neutral-medium-gray">{t('projectsDetail.openSource')}</p>
              <Link href={project.githubLink || ''} className="body-s relative flex items-center gap-[8px]">
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
