import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import {
  HACKQUEST_DISCORD,
  HACKQUEST_TELEGRAM,
  HACKQUEST_TWITTER
} from '@/constants/links';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import Button from '@/components/Common/Button';
interface TopBannerProps {}

const TopBanner: FC<TopBannerProps> = (props) => {
  return (
    <div className="h-[50rem] overflow-hidden bg-neutral-off-black">
      <div className="container relative mx-auto px-10 py-20">
        <div className="absolute -left-[190px] -top-[286px] h-[1593px] w-[2013px]">
          <Image
            src={'/images/advocate/banner_bg.webp'}
            fill
            alt="hackquest"
          ></Image>
        </div>
        <div className="mx-auto flex w-[800px] max-w-[800px] flex-col items-center gap-[60px] text-center">
          <div>
            <h2 className="text-h2 text-neutral-white">❤️ HackQuest? </h2>
            <h1 className="text-h2 mt-2 text-neutral-white">
              Join our rapidly growing Community!
            </h1>
          </div>
          <p className="body-m text-neutral-light-gray">
            HackQuest advocates are your local Web3 superheroes: empowering
            others, addressing challenges, engaging communities, impacting the
            globe, and building a brighter future!
          </p>
          <div className="z-50 flex gap-[2.5rem]">
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
            href={'https://xsxo494365r.typeform.com/to/X1n7gsPH'}
            target="_blank"
          >
            <Button
              type="primary"
              className="button-text-l px-[55px] py-[19px] uppercase text-neutral-black"
            >
              Apply
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
