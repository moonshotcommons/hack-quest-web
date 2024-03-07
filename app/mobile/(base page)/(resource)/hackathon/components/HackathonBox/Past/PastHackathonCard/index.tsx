import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { Typography } from 'antd';

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
      href={`${MenuLink.HACKATHON}/${hackathon.alias}`}
      className="block w-full"
    >
      <div className="flex h-[7.5rem]  w-full overflow-hidden rounded-[.75rem] bg-neutral-white ">
        <div className="relative h-0 w-[7.5rem] bg-[#D9D9D9]">
          {cover && (
            <Image
              src={cover}
              fill
              alt="hackathon cover"
              className="object-cover"
            ></Image>
          )}
        </div>
        <div className="flex h-full flex-1 flex-col justify-between  p-[.75rem] wapMin:px-[.25rem]">
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="body-s text-neutral-off-black"
            style={{ marginBottom: 0 }}
          >
            {name}
          </Typography.Paragraph>
          {/* </h2> */}
          <div className="flex h-[2.25rem] w-full gap-[.5rem] wapMin:gap-[.25rem]">
            <div className="w-[5px] flex-shrink-0 rounded-full bg-neutral-light-gray wapMin:w-[3px]"></div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex w-full items-center gap-[.5rem] wapMin:gap-[.25rem]">
                <p className="caption-10pt flex-shrink-0 text-neutral-medium-gray">
                  RUNS FROM
                </p>
                <p className="caption-12pt wapMin:caption-10pt w-0 flex-1 truncate  text-neutral-off-black">
                  {formatTime(startTime, endTime)}
                </p>
              </div>
              <div className="flex w-full items-center gap-[.5rem] wapMin:gap-[.25rem]">
                <p className="caption-10pt flex-shrink-0 text-neutral-medium-gray">
                  HAPPENING
                </p>
                <div className="caption-12pt wapMin:caption-10pt relative  w-0 flex-1 truncate text-neutral-off-black underline">
                  {address}
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
