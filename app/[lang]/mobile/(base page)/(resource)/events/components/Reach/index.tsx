import React from 'react';
import ReackBg from '@/public/images/resource/reach_bg.png';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM } from '@/constants/links';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';

interface ReachProp {}

const Reach: React.FC<ReachProp> = () => {
  return (
    <div
      className="mt-[2.5rem] flex h-[22.125rem] items-center justify-center px-[1.25rem]"
      style={{
        backgroundColor: 'var(--neutral-white)',
        backgroundImage: `url(${ReackBg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container flex flex-col gap-[2.5rem]">
        <p className="text-h2-mob text-neutral-off-black">Reach Out To Us</p>
        <p className="body-xs text-neutral-medium-gray">
          Do you have any questions about our events? We’d love to hear your thoughts! <br /> You can also keep in touch
          with us by joining our Discord / Telegram!
        </p>
        <div className="flex gap-[1rem]">
          <Link href={HACKQUEST_DISCORD} target="_blank" className="cursor-pointer hover:scale-[1.1]">
            <span className="text-text-default-color">
              <DiscordIcon color={'black'} isMobile />
            </span>
          </Link>
          <Link href={HACKQUEST_TELEGRAM} target="_blank" className="cursor-pointer hover:scale-[1.1]">
            <span className="text-text-default-color">
              <TelegramIcon color={'black'} isMobile />
            </span>
          </Link>
        </div>
        <Button type="primary" className="button-text-m body-m h-[3rem] w-[10.3125rem] p-0 uppercase">
          Submit Inquiry
        </Button>
      </div>
    </div>
  );
};

export default Reach;
