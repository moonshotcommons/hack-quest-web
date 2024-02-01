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
      className="block w-full"
    >
      <div className="card-hover h-fit w-full overflow-hidden rounded-[10px]  bg-white text-neutral-off-black">
        <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[56.25%]">
          {cover && (
            <Image
              src={cover}
              fill
              alt="hackathon cover"
              className="object-cover"
            ></Image>
          )}
        </div>
        <div className="flex flex-col gap-[16px] px-[24px]  py-[20px]">
          <div className="body-l-bold line-clamp-2 h-[44px] text-neutral-off-black">
            {name}
          </div>
          <div className="flex h-[48px] w-full gap-[8px]">
            <div className="h-full w-[5px] flex-shrink-0 rounded-full bg-neutral-light-gray"></div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-center gap-[8px]">
                <p className="body-xs text-neutral-medium-gray">RUNS FROM</p>
                <p className="body-s">{formatTime(startTime, endTime)}</p>
              </div>
              <div className="flex w-full items-center gap-[8px]">
                <p className="body-xs text-neutral-medium-gray">HAPPENING</p>
                <div className=" relative h-[22px] flex-1">
                  <div className="underline-s absolute left-0 top-0 h-full w-full truncate">
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
