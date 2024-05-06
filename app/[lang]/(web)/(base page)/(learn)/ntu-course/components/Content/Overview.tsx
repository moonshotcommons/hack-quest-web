import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import OverviewCover from '@/public/images/learn/overview_cover.png';
import NtuLogoText from '@/public/images/learn/ntu_logo_text.svg';
import HackLogo from '@/public/images/learn/hack_logo.png';
import Image from 'next/image';
import { overviewData } from '../../constants/data';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '@/components/Common/Button';

interface OverviewProp {}

const Overview: React.FC<OverviewProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <div className="flex gap-[40px]">
      <div className="relative h-[498px] w-[498px] flex-shrink-0">
        <Image src={OverviewCover} fill alt="npt-course" priority className="object-cover" />
      </div>

      <div className="flex h-[498px] flex-col justify-between">
        <h1 className="text-h2">{t(overviewData.name)}</h1>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.time')}</p>
          <p>{overviewData.time}</p>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.format')}</p>
          <p>{overviewData.format}</p>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.hosts')}</p>
          <div className="flex items-center gap-[20px]">
            <Image src={HackLogo} width={90} alt="hack_logo" />
            <div className="flex items-center gap-[2px]">
              <Image src={NtuLogoText} width={132} alt="htu_logo" />
            </div>
          </div>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.discussionGroups')}</p>
          <div className="flex items-center gap-[40px]">
            {overviewData.discussionGroups.map((v) => (
              <Link key={v.name} href={v.link} target="_blank">
                <div className="flex items-center gap-[8px]">
                  {v.icon()}
                  <div className="relative flex items-center gap-[6px]">
                    <span>{v.name}</span>
                    <IoIosArrowForward />
                    <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full pt-[20px]">
          <Link href={overviewData.registerLink} target="_blank">
            <Button type="primary" disabled className="button-text-l h-[60px] w-full uppercase text-neutral-off-black">
              {t('ntuCourse.overview.openSoon')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
