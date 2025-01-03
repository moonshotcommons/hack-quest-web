import { FC } from 'react';
import BubbleCard from './BubbleCard';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import webApi from '@/service';

interface TopBannerProps {
  lang: Lang;
}

const TopBanner: FC<TopBannerProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LANDING);

  let userCount = '50k+';

  try {
    let { total } = await webApi.userApi.fetchUserCount();
    userCount = total.toLocaleString();
  } catch (err) {}

  const getLandingTitle = () => {
    switch (lang) {
      case Lang.ZH:
        return (
          <h1 className="text-h1 mt-[8.125rem] text-center text-neutral-white">
            <span>适合</span>
            <span className="text-yellow-dark">所有人</span>
            <span>的</span>
            <br />
            <span className="inline-block pt-2"> Web3 编程平台</span>
          </h1>
        );
      default:
        return (
          <h1 className="text-h1 mt-[8.125rem] text-center text-neutral-white">
            Web3 Programming
            <br />
            For <span className="text-yellow-dark">Everyone</span>
          </h1>
        );
    }
  };

  return (
    <div className="flex h-[50rem] w-full flex-col items-center justify-between bg-neutral-black">
      <div className="flex flex-col items-center">
        {getLandingTitle()}
        <Link href={'/ecosystem-explore'}>
          <Button type="primary" className="button-text-l mt-12 w-[168px] px-0 py-4 uppercase">
            {t('TopBanner.explore')}
          </Button>
        </Link>

        <BubbleCard direction="right" className="-mt-[13px] translate-x-[calc(50%+134px+52px)]">
          <Image
            src="/images/landing/telos.webp"
            alt={t('TopBanner.hackathonRecommand')}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="text-neutral-off-white">
            <div className="body-m body-xs-bold w-fit rounded-[.5rem] border border-yellow-primary px-2 py-1 capitalize text-yellow-primary">
              {t('TopBanner.hackathon')}
            </div>
            <Link
              href={'/hackathon/explore/Telos-Mini-Hackathon'}
              className="body-m-bold mt-2 flex items-center gap-2"
              target="_blank"
            >
              <span className="relative capitalize after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                {t('TopBanner.hackathonRecommand')}
              </span>
              <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 3.5L10 8.79412L2.5 14.0882"
                  stroke="#F4F4F4"
                  strokeWidth="1.76471"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </BubbleCard>
        {/* <BubbleCard direction="left" className="-mt-[40px] -translate-x-[calc(50%+267px)]">
          <Image src="/images/landing/code_icon.png" alt="code" width={48} height={48}></Image>
          <div className="text-neutral-off-white">
            <p className="body-m">{t('TopBanner.learnAndBuildAlongside')}</p>
            <p className="body-xl-bold">
              {userCount} {t('TopBanner.developers')}
            </p>
          </div>
        </BubbleCard> */}
        <BubbleCard direction="left" className="-mt-[40px] -translate-x-[calc(50%+200px)]">
          <Image src="/images/landing/xion.svg" alt="code" width={48} height={48}></Image>
          <div className="text-neutral-off-white">
            <div className="body-m body-xs-bold w-fit rounded-[.5rem] border border-yellow-primary px-2 py-1 capitalize text-yellow-primary">
              {t('TopBanner.learningTrack')}
            </div>
            <Link
              href={'/ecosystem-explore/11be7446-5ed5-810c-ba5f-dfed6fa879e7'}
              className="body-m-bold mt-2 flex items-center gap-2"
              target="_blank"
            >
              <span className="relative capitalize after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                {t('TopBanner.xionLearningTrack')}
              </span>
              <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 3.5L10 8.79412L2.5 14.0882"
                  stroke="#F4F4F4"
                  strokeWidth="1.76471"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </BubbleCard>
      </div>

      <div className="flex h-[232px] w-full flex-col overflow-hidden">
        <img src={'/images/landing/center_moon.svg'} alt="hackquest" className="w-full"></img>
        <div className="w-full flex-1 bg-neutral-off-white"></div>
        <div className="absolute left-1/2 top-[28.125rem] h-[9.625rem] w-[13.625rem] -translate-x-1/2">
          <Image src={'/images/landing/center_astronaut.svg'} alt="hackquest" fill priority></Image>
        </div>
        <div className="absolute left-1/2 top-[41.125rem] -translate-x-1/2 text-center">
          <p className="body-m text-neutral-off-black">Learn and build alongside</p>
          <p className="body-xl-bold text-neutral-off-black">
            {userCount} {t('TopBanner.developers')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
