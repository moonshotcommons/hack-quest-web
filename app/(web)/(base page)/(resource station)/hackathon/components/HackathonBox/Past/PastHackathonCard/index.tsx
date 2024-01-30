import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

interface PastHackathonCardProps {
  hackathon: HackathonType;
}

const formatTime = (startTime: string, endTime: string) => {
  startTime = moment(startTime).format('ll');
  endTime = moment(endTime).format('ll');
  return `${startTime} - ${endTime}`;
};

const PastHackathonCard: FC<PastHackathonCardProps> = ({ hackathon }) => {
  const { name, startTime, address, image: cover, endTime } = hackathon;
  return (
    <Link
      href={`${menuLink.hackathon}/${hackathon.id}?menu=${Menu.HACKATHON}&${QueryIdType.HACKATHON_ID}=${hackathon.id}`}
      className="w-full block"
    >
      <div className="rounded-[10px] overflow-hidden text-neutral-off-black w-full h-fit  bg-white card-hover">
        <div className="w-full bg-[#D9D9D9] rounded-t-[10px] relative pt-[56.25%] h-0">
          {cover && (
            <Image
              src={cover}
              fill
              alt="hackathon cover"
              className="object-cover"
            ></Image>
          )}
        </div>
        <div className="py-[20px] px-[24px] flex flex-col  gap-[16px]">
          <div className="line-clamp-2 h-[44px] font-next-book-bold text-neutral-off-black text-[18px] leading-[125%] -tracking-[0.185px]">
            {name}
          </div>
          <div className="flex w-full h-[48px] gap-[8px]">
            <div className="w-[5px] h-full rounded-full bg-neutral-light-gray flex-shrink-0"></div>
            <div className="flex flex-col justify-between flex-1">
              <div className="flex items-center gap-[8px]">
                <p className="body-xs text-neutral-medium-gray">RUNS FROM</p>
                <p className="body-s">{formatTime(startTime, endTime)}</p>
              </div>
              <div className="flex items-center gap-[8px] w-full">
                <p className="body-xs text-neutral-medium-gray">HAPPENING</p>
                <div className=" flex-1 h-[22px] relative">
                  <div className="absolute left-0 top-0 w-full h-full underline-s truncate">
                    {address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PastHackathonCard;
