import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ConnectedUsProps {}

const ConnectedUs: FC<ConnectedUsProps> = (props) => {
  return (
    <div className="flex h-[30rem] w-full items-center justify-center overflow-hidden bg-neutral-black">
      <div className="relative flex h-full flex-col items-center justify-center gap-[3.75rem] text-neutral-white">
        <h2 className="text-h2">Stay Connected with us</h2>
        <div className="flex gap-[3.75rem]">
          <Link
            href={'https://discord.gg/KkAJHPqywn'}
            target="_blank"
            className="cursor-pointer hover:scale-[1.1]"
          >
            <span className="text-text-default-color">
              <DiscordIcon color={'white'} />
            </span>
          </Link>
          <Link
            href={'https://x.com/hackquest_?s=21&t=kYetGSBybf-ssFBo7GodGA'}
            target="_blank"
            className="cursor-pointer hover:scale-[1.1]"
          >
            <span className="text-text-default-color">
              <TwitterIcon color={'white'} />
            </span>
          </Link>
          <Link
            href={'https://t.me/hackquester'}
            target="_blank"
            className="cursor-pointer hover:scale-[1.1]"
          >
            <span className="text-text-default-color">
              <TelegramIcon color={'white'} />
            </span>
          </Link>
        </div>
        <Link href={'https://xsxo494365r.typeform.com/to/p5cEH74M'}>
          <Button
            type="primary"
            className="button-text-m px-6 py-4 uppercase text-neutral-black"
          >
            collab with us
          </Button>
        </Link>
        <div className="absolute -left-[calc(100%+60px)] -top-11 h-[30.1875rem] w-[29.4375rem]">
          <Image
            src={'/images/landing/connected_us_left.png'}
            alt="hackquest"
            fill
          ></Image>
        </div>
        <div className="absolute bottom-0 left-[calc(100%+130px)] h-[23.4375rem] w-[24.5625rem]">
          <Image
            src={'/images/landing/connected_us_right.png'}
            alt="hackquest"
            fill
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUs;
