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
    <div className="w-full overflow-hidden">
      <div className="container relative mx-auto flex h-[30rem] max-w-[77.5rem] flex-col items-center justify-center gap-[3.75rem]">
        <h2 className="mt-[3.125rem] text-[3rem] font-medium leading-[110%] -tracking-[1.92px] text-white">
          Stay Connected with us
        </h2>
        <div className="flex gap-[3.75rem]">
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
        <Link
          href={'https://xsxo494365r.typeform.com/to/tJymzU8a'}
          target="_blank"
        >
          <Button
            type="mantle"
            className="w-[18.75rem] rounded-[.625rem] px-0 py-4 text-neutral-black"
          >
            Collab with Us
          </Button>
        </Link>
        <div className="absolute -left-[9.375rem] top-0 h-[30.1875rem] w-[29.4375rem]">
          <Image
            src={'/images/mantle/connected_us_left.svg'}
            alt="hackquest"
            fill
          ></Image>
        </div>
        <div className="absolute -right-[calc(9.125rem)] bottom-0 h-[12.5rem] w-[13.125rem]">
          <Image
            src={'/images/mantle/connected_us_right.svg'}
            alt="hackquest"
            fill
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUs;
