'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import {
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import useDealhackathon from '@/hooks/useDealHackathonData';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import Link from 'next/link';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const closeInTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<HackathonStatusType>(
    HackathonStatusType.ON_GOING
  );
  const [closeInTime, setCloseInTime] = useState('');
  const { getRunFromTime, getCloseInTime, getParticipantsStr } =
    useDealhackathon();
  const getCloseIn = () => {
    const t = getCloseInTime(hackathon.endTime);
    if (t === HackathonStatusType.PAST) {
      setStatus(HackathonStatusType.PAST);
      if (closeInTimeOut.current) clearTimeout(closeInTimeOut.current);
      return;
    }
    setCloseInTime(t);
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
      <div className="text-h4">{hackathon.name}</div>
      <div>
        <div className="body-l-bold mb-[5px]">THEME</div>
        <pre className="body-m">{hackathon.theme}</pre>
      </div>
      <div>
        <div className="body-l-bold mb-[5px]">PARTICIPANTS</div>
        <div className="body-m break-words">
          {getParticipantsStr(hackathon.participants)}
        </div>
      </div>
      <div>
        <div className="body-l-bold mb-[5px]">HOST</div>
        {hackathon.hosts.map((v, i) => (
          <div key={i} className="flex-row-center mb-[10px] h-[30px]">
            <div className="relative h-[30px] w-[30px]">
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
      <div className="relative flex h-[100px] flex-col justify-between pl-[20px]">
        <div className="absolute left-0 top-0 h-full w-[5px] rounded-[10px] bg-yellow-primary"></div>
        <div>
          <div className="text-neutral-medium-gray">RUNS FROM</div>
          <div className="body-m">
            {getRunFromTime(hackathon.startTime, hackathon.endTime)}
          </div>
        </div>
        <div>
          <div className="text-neutral-medium-gray">HAPPENING</div>
          <div className="body-m">{hackathon.address}</div>
        </div>
      </div>
      {status === HackathonStatusType.ON_GOING ? (
        <>
          <div className="flex h-[63px] flex-col justify-center rounded-[10px] bg-[rgba(255,244,206,0.5)] px-[20px] ">
            <div className="text-neutral-medium-gray">
              APPLICATIONS CLOSE IN
            </div>
            <div className="body-m">{closeInTime}</div>
          </div>
          <Button
            className="body-l h-[60px] w-full bg-yellow-primary"
            onClick={() => {
              BurialPoint.track(`hackathon detail Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            Apply Now
          </Button>
        </>
      ) : (
        <>
          <div className="flex h-[63px] flex-col justify-center rounded-[10px] bg-[rgba(218,218,218,0.5)] px-[20px] ">
            <div className="body-xl text-neutral-medium-gray">
              This hackathon is not available now.
            </div>
          </div>
          <Link
            className="body-l h-[60px] w-full border border-neutral-black"
            onClick={() => {
              BurialPoint.track(`hackathon detail View All Projects 按钮点击`);
            }}
            href={`${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects&keyWord=${hackathon.name}`}
          >
            View All Projects
          </Link>
        </>
      )}
    </div>
  );
};

export default HackathonInfo;
