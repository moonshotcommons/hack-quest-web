import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/v2/Common/Button';
import { useRouter } from 'next/router';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/hackathon/type';
import useDealhackathon from '@/hooks/useDealHackathonData';
import { menuLink } from '../../Breadcrumb/data';
import { Menu, QueryIdType } from '../../Breadcrumb/type';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const router = useRouter();
  const closeInTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [closeInTime, setCloseInTime] = useState('');
  const { getRunFromTime, getCloseInTime, getParticipantsStr } =
    useDealhackathon();
  const getCloseIn = () => {
    setCloseInTime(getCloseInTime(hackathon.endTime));
    closeInTimeOut.current = setTimeout(() => {
      getCloseIn();
    }, 60 * 1000);
  };
  useEffect(() => {
    getCloseIn();
    return () => {
      if (closeInTimeOut.current) clearTimeout(closeInTimeOut.current);
    };
  }, [hackathon]);
  return (
    <div className="flex flex-col gap-[25px] ">
      <div className="text-[21px] leading-[21px] font-next-book-bold">
        {hackathon.name}
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          THEME
        </div>
        <div className="text-[16px] leading-[20px]">{hackathon.theme}</div>
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          PARTICIPANTS
        </div>
        <div className="text-[16px] leading-[20px]">
          {getParticipantsStr(hackathon.participants)}
        </div>
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          HOST
        </div>
        {hackathon.hosts.map((v, i) => (
          <div key={i} className="h-[30px] flex-row-center">
            <div className="w-[30px] h-[30px] relative">
              <Image
                src={v.picture}
                alt="hackathonHost"
                fill
                className="object-contain"
              ></Image>
            </div>
            <span className="pl-[10px] uppercase">{v.name}</span>
          </div>
        ))}
      </div>
      <div className="relative h-[100px] flex flex-col justify-between pl-[20px]">
        <div className="absolute left-0 top-0 w-[5px] h-full rounded-[10px] bg-[#ffd850]"></div>
        <div>
          <div className="text-[#8C8C8C]">RUNS FROM</div>
          <div className="text-[16px]">
            {getRunFromTime(hackathon.startTime)}
          </div>
        </div>
        <div>
          <div className="text-[#8C8C8C]">HAPPENING</div>
          <div className="text-[16px]">{hackathon.address}</div>
        </div>
      </div>
      {hackathon.status === HackathonStatusType.ON_GOING ? (
        <>
          <div className="h-[63px] px-[20px] rounded-[10px] bg-[rgba(255,244,206,0.5)] flex flex-col justify-center ">
            <div className="text-[#8C8C8C]">APPLICATIONS CLOSE IN</div>
            <div className="text-[16px]">{closeInTime}</div>
          </div>
          <Button
            className="w-full h-[60px] text-[18px] bg-[#ffd850]"
            onClick={() => window.open(hackathon.applyLink)}
          >
            Apply Now
          </Button>
        </>
      ) : (
        <>
          <div className="h-[63px] px-[20px] rounded-[10px] bg-[rgba(218,218,218,0.5)] flex flex-col justify-center ">
            <div className="text-[#8C8C8C] text-[21px]">
              This hackathon is not available now.
            </div>
          </div>
          <Button
            className="w-full h-[60px] text-[18px] border border-[#0b0b0b]"
            onClick={() =>
              router.push(
                `${menuLink.projects}/projects?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects`
              )
            }
          >
            View All Projects
          </Button>
        </>
      )}
    </div>
  );
};

export default HackathonInfo;
