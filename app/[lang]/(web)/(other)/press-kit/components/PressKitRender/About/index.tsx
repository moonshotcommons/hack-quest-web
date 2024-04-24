import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';
import { aboutData } from '../../../constants/data';
import SubTitle from '../../SubTitle';
import Link from 'next/link';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER, HACKQUEST_TELEGRAM } from '@/constants/links';

interface AboutProp {
  lang: Lang;
}

const About: React.FC<AboutProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.PRESS_KIT);
  return (
    <div>
      <h1 className="text-h2 mb-[28px]">{t('about')}</h1>
      <div className="mb-[40px] flex flex-col gap-[36px]">
        {aboutData.map((about, i) => (
          <div key={i}>
            <SubTitle title={about.title} />
            <div className="body-l ">
              <div className="flex flex-col gap-[15px]">
                {about.content.map((c, j) => (
                  <p key={j}>{c}</p>
                ))}
              </div>
              {about.ul && (
                <div className="mt-[15px] flex flex-col gap-[15px] px-[20px]">
                  <ul className="list-decimal  pl-[20px]">
                    {about.ul.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                  <ul className="list-disc pl-[20px]">
                    {about.ul.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="body-m  flex  justify-between  border-t border-neutral-light-gray pt-[20px] text-neutral-medium-gray">
        <span>{t('stayConnected')}</span>
        <div className="flex items-center gap-[16px]">
          <Link href={HACKQUEST_DISCORD} target="_blank" className="cursor-pointer hover:scale-[1.1]">
            <span className="text-text-default-color">
              <DiscordIcon color={'#8c8c8c'} isMobile={true} />
            </span>
          </Link>
          <Link href={HACKQUEST_TWITTER} target="_blank" className="cursor-pointer hover:scale-[1.1]">
            <span className="text-text-default-color">
              <TwitterIcon color={'#8c8c8c'} isMobile={true} />
            </span>
          </Link>
          <Link href={HACKQUEST_TELEGRAM} target="_blank" className="cursor-pointer hover:scale-[1.1]">
            <span className="text-text-default-color">
              <TelegramIcon color={'#8c8c8c'} isMobile={true} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
