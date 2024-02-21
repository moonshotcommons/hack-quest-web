import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
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
      href={`${menuLink.hackathon}/${hackathon.alias}?menu=${Menu.HACKATHON}&${QueryIdType.HACKATHON_ID}=${hackathon.id}`}
    >
      <div className="flex h-fit w-full cursor-pointer flex-col gap-y-[22px] overflow-hidden rounded-[10px] bg-neutral-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
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
        <div className="flex flex-col px-[22px] pb-[30px]">
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="body-l-bold min-h-[46px] text-neutral-black"
            style={{ marginBottom: 0 }}
          >
            {name}
          </Typography.Paragraph>
          {/* </h2> */}
          <div className="mt-[15px] flex h-fit w-full gap-[15px]">
            <div className="w-[5px] rounded-full bg-yellow-primary"></div>
            <div className="flex flex-col gap-[15px]">
              <div className="w-full">
                <p className="body-xs text-neutral-medium-gray">RUNS FROM</p>
                <p className="body-s mt-[5px] text-neutral-black">
                  {formatTime(startTime, endTime)}
                </p>
              </div>
              <div className="w-full">
                <p className="body-xs text-neutral-medium-gray">HAPPENING</p>

                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  className="body-s mt-[5px] min-h-[36px] text-neutral-black"
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
