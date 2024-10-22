import { FC } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

interface TopBannerProps {
  lang: Lang;
}

const TopBanner: FC<TopBannerProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LANDING);

  const getLandingTitle = () => {
    switch (lang) {
      case Lang.ZH:
        return (
          <h1 className="text-h1 text-center text-[30px] text-neutral-white">
            <span>适合</span>
            <span className="text-yellow-primary">所有人</span>
            <span>的</span>
            <br />
            <span className="inline-block pt-2"> Web3编程平台</span>
          </h1>
        );
      default:
        return (
          <h1 className="text-h1 text-center text-[30px] text-neutral-white">
            Web3 Programming
            <br />
            For <span className="text-yellow-primary">Everyone</span>
          </h1>
        );
    }
  };

  return (
    <div className="flex h-[42.625rem] w-full flex-col items-center justify-between bg-neutral-black pt-10">
      <div className="flex flex-col items-center">
        {getLandingTitle()}
        <Link href={'/ecosystem-explore'} target="_blank">
          <Button type="primary" className="button-text-m mt-12 px-[3.25rem] py-4 uppercase">
            {t('TopBanner.explore')}
          </Button>
        </Link>

        <div className="mt-[3rem] flex w-fit gap-4 rounded-[1rem] border border-neutral-off-white p-4">
          <div className="h-fit w-fit">
            <Image
              src="/images/landing/AIA logo_彩2.png"
              alt={t('TopBanner.aiaHackathon')}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex-1 text-neutral-off-white">
            <div className="body-m body-xs-bold w-fit rounded-[.5rem] border border-yellow-primary px-2 py-1 text-yellow-primary">
              {t('TopBanner.hackathon')}
            </div>
            <Link
              href={'/hackathon/explore/AIA-Chain-Inaugural-Hackathon'}
              className="body-m-bold mt-2 flex items-center gap-2 text-[.75rem]"
              target="_blank"
            >
              <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                {t('TopBanner.aiaHackathon')}
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
        </div>
      </div>

      <div className="absolute top-[620px] flex w-full flex-col">
        <Image
          src={'/images/landing/center_moon_mobile.svg'}
          alt="hackquest"
          width={1834}
          height={409}
          className="z-1 w-full"
        ></Image>
        <div className="w-full flex-1 bg-neutral-off-white"></div>
        <div className="absolute left-1/2 top-0 z-20 h-[9.625rem] w-[13.625rem] -translate-x-1/2 -translate-y-[calc(100%-36px)]">
          <Image src={'/images/landing/center_astronaut.svg'} alt="hackquest" fill priority></Image>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
