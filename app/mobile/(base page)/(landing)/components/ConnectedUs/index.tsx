import Button from '@/components/Common/Button';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import {
  HACKQUEST_DISCORD,
  HACKQUEST_TELEGRAM,
  HACKQUEST_TWITTER
} from '@/constants/links';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ConnectedUsProps {}

const ConnectedUs: FC<ConnectedUsProps> = (props) => {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-neutral-black py-[3.75rem]">
      <div className="relative flex h-full flex-col items-center justify-center gap-10 text-neutral-white">
        <h2 className="text-h2 text-[1.375rem]">Stay Connected with us</h2>
        <div className="flex gap-10">
          <Link
            href={HACKQUEST_DISCORD}
            target="_blank"
            className="cursor-pointer hover:scale-[1.1]"
          >
            <span className="text-text-default-color">
              <DiscordIcon color={'white'} />
            </span>
          </Link>
          <Link
            href={HACKQUEST_TWITTER}
            target="_blank"
            className="cursor-pointer hover:scale-[1.1]"
          >
            <span className="text-text-default-color">
              <TwitterIcon color={'white'} />
            </span>
          </Link>
          <Link
            href={HACKQUEST_TELEGRAM}
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
        {/* <div className="w-[29.4375rem] h-[30.1875rem] absolute -top-11 -left-[calc(100%+60px)]">
          <Image
            src={'/images/landing/connected_us_left.png'}
            alt="hackquest"
            fill
          ></Image>
        </div> */}
      </div>
      <div className="absolute bottom-[1.0625rem] left-[53%] h-[12.5rem] w-[13.125rem]">
        <Image
          src={'/images/landing/connected_us_right.png'}
          alt="hackquest"
          fill
        ></Image>
      </div>
    </div>
  );
};

export default ConnectedUs;
