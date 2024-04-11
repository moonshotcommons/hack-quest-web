import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { LangContext } from '@/components/Provider/Lang';
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';
import React, { useContext } from 'react';

interface BlogLinkProp {}

const BlogLink: React.FC<BlogLinkProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  return (
    <>
      <div className="mx-5 mb-4 box-content h-[1px] bg-neutral-light-gray"></div>
      <div className="body-s mb-[2.5rem] flex justify-between px-[1.25rem] text-neutral-medium-gray">
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
    </>
  );
};

export default BlogLink;
