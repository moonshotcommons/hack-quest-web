import { TransNs, Lang } from '@/i18n/config';
import React from 'react';
import OverviewCover from '@/public/images/learn/overview_cover_mobile.png';
import NtuLogoText from '@/public/images/learn/ntu_logo_text.svg';
import HackLogo from '@/public/images/learn/hack_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '@/components/Common/Button';
import { overviewData } from '@/app/[lang]/(web)/(base page)/(learn)/ntu-course/constants/data';
import { useTranslation } from '@/i18n/server';

interface OverviewProp {
  lang: Lang;
}

const Overview: React.FC<OverviewProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LEARN);
  return (
    <div className="">
      <div className="relative mb-[1.75rem] h-0 w-full pt-[56.28%]">
        <Image src={OverviewCover} fill alt="npt-course" priority className="object-cover" />
      </div>

      <div className="flex flex-col gap-[1.25rem]">
        <h1 className="text-h3-mob">{t(overviewData.name)}</h1>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.time')}</p>
          <p>{overviewData.time}</p>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.format')}</p>
          <p>{overviewData.format}</p>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.hosts')}</p>
          <div className="flex items-center gap-[1.25rem]">
            <Image src={HackLogo} width={90} alt="hack_logo" />
            <div className="flex items-center gap-[.125rem]">
              <Image src={NtuLogoText} width={148} alt="htu_logo" />
            </div>
          </div>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.discussionGroups')}</p>
          <div className="flex items-center gap-9">
            {overviewData.discussionGroups.map((v) => (
              <Link key={v.name} href={v.link} target="_blank">
                <div className="flex items-center gap-[.25rem]">
                  {v.icon(18)}
                  <div className="relative flex items-center gap-[.25rem]">
                    <span>{v.name}</span>
                    <IoIosArrowForward />
                    <div className="absolute bottom-0 left-0 h-[.125rem] w-full rounded-[.125rem] bg-yellow-dark"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full pt-[.625rem]">
          <Link href={overviewData.registerLink} target="_blank">
            <Button type="primary" className="button-text-m h-[3rem] w-full uppercase text-neutral-off-black">
              {t('ntuCourse.overview.registerNow')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
