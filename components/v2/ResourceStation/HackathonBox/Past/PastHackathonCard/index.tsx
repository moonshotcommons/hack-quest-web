import Image from 'next/image';
import { FC, ReactNode } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
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
      href={`${menuLink.hackathon}/${hackathon.id}?menu=${Menu.HACKATHON}&${QueryIdType.HACKATHON_ID}=${hackathon.id}`}
    >
      <div className="rounded-[10px] overflow-hidden w-full h-fit flex gap-y-[22px] flex-col bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer">
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
        <div className="pb-[30px] flex flex-col px-[22px]">
          {/* <h2 className="font-next-book-bold text-[#0b0b0b] text-[18px] leading-[125%] -tracking-[0.185px] min-h-[46px]"> */}
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="font-next-book-bold text-[#0b0b0b] text-[18px] leading-[125%] -tracking-[0.185px] min-h-[46px]"
            style={{ marginBottom: 0 }}
          >
            {name}
          </Typography.Paragraph>
          {/* </h2> */}
          <div className="mt-[15px] flex w-full h-fit gap-[15px]">
            <div className="w-[5px] rounded-full bg-[#FFD850]"></div>
            <div className="flex flex-col gap-[15px]">
              <div className="w-full font-next-book leading-[125%]">
                <p className="text-[12px] tracking-[0.24px] text-[#8C8C8C]">
                  RUNS FROM
                </p>
                <p className="mt-[5px] text-[14px] text-[#0b0b0b] tracking-[0.28px]">
                  {formatTime(startTime, endTime)}
                </p>
              </div>
              <div className="w-full font-next-book leading-[125%]">
                <p className="text-[12px] leading-[125%] tracking-[0.24px] text-[#8C8C8C]">
                  HAPPENING
                </p>

                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  className="mt-[5px] text-[14px] text-[#0b0b0b] tracking-[0.28px] min-h-[36px]"
                  style={{ marginBottom: 0 }}
                >
                  {address}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PastHackathonCard;
