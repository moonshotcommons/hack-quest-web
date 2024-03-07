import Button from '@/components/Common/Button';
import Image from 'next/image';
import { FC } from 'react';
import TeaserInfo from '@/public/images/mantle/teaser_info_mobile.webp';
import Link from 'next/link';

interface StillNotSureProps {}

const StillNotSure: FC = () => {
  return (
    <div className="w-full px-5">
      <div className="mx-auto flex w-full max-w-[77.5rem] flex-col items-center gap-4 rounded-[15px] border border-[#202020] py-5 text-center">
        <h3 className="text-[36px] font-medium leading-[110%] -tracking-[1.92px] text-white">
          Still not sure?
          <br />
          Create your own token in 10 minutes and decide.
        </h3>
        <div className="flex w-full flex-col gap-4 px-[.625rem]">
          <Link href={'/learning-track'}>
            <Button
              block
              type="mantle"
              className="rounded-[10px] px-0 text-[18px] leading-[140%] text-neutral-black"
            >
              Explore Mantle Learning Tracks
            </Button>
          </Link>

          <Link href={'/practices'}>
            <Button
              ghost
              block
              className="rounded-[10px] border-[#CCE9E7] text-[18px] leading-[140%] text-[#CCE9E7] hover:bg-[#CCE9E7] hover:text-neutral-black"
            >
              Explore Electives
            </Button>
          </Link>
        </div>
        <div className="relative flex h-0 w-full justify-center pt-[calc(26.923%+40px)]">
          <Image src={TeaserInfo} alt="hackquset" fill></Image>
          {/* <div
          className="absolute bottom-0 left-[9.6%] mx-auto h-[7.375rem] w-[81.5%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(33, 33, 33, 0.00) 0%, #212121 100%)'
          }}
        ></div> */}
        </div>
      </div>
    </div>
  );
};

export default StillNotSure;
