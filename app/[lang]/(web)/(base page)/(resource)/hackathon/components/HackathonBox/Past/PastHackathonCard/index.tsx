import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { Typography } from 'antd';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

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
    <Link href={`${MenuLink.HACKATHON}/${hackathon.alias}`}>
      <div className="card-hover flex  w-full flex-col overflow-hidden rounded-[16px] bg-neutral-white ">
        <div className="relative h-0 w-full rounded-t-[10px] bg-[#D9D9D9] pt-[56.25%]">
          {cover && <Image src={cover} fill alt="hackathon cover" className="object-cover"></Image>}
        </div>
        <div className="flex h-[148px] flex-col justify-between px-[20px] py-[20px]">
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="text-h3-mob font-next-book-bold text-neutral-black"
            style={{ marginBottom: 0 }}
          >
            {name}
          </Typography.Paragraph>
          {/* </h2> */}
          <div className="flex h-[48px] w-full gap-[8px]">
            <div className="w-[5px] flex-shrink-0 rounded-full bg-neutral-light-gray"></div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex w-full items-center gap-[8px]">
                <p className="body-xs text-neutral-medium-gray">RUNS FROM</p>
                <p className="body-s text-neutral-black">{formatTime(startTime, endTime)}</p>
              </div>
              <div className="flex w-full items-center gap-[8px]">
                <p className="body-xs flex-shrink-0 text-neutral-medium-gray">HAPPENING</p>
                <div className="body-s relative  w-0 flex-1 flex-grow-[1] text-neutral-black">
                  <p className="truncate">{address}</p>
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
