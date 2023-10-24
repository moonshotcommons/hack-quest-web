import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import IconTip from '@/public/images/mission-center/icon_tip.svg';
import IconLock from '@/public/images/mission-center/icon_lock.png';
import { equityList, EquityListType, equityTip, EquityTipType } from './data';
import { BurialPoint } from '@/helper/burialPoint';
interface EquityProp {
  level: number;
}
const Equity: React.FC<EquityProp> = ({ level }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    if (!showMore) {
      BurialPoint.track(`mission-center-HackQuest Rights 查看更多`);
    } else {
      BurialPoint.track(`mission-center-HackQuest Rights 收起`);
    }
    setShowMore(!showMore);
  };

  const renderEquity = (v: EquityListType, i: number) => {
    if (level > v.level) {
      return (
        <li key={i} className={`flex items-center leading-[23px] pl-[20px]`}>
          <span className="w-[5px] h-[5px] rounded-[50%] bg-[#0b0b0b]"></span>
          <span className="ml-[10px]">{v.label}</span>
        </li>
      );
    } else {
      return (
        <li
          key={i}
          className={`flex items-center leading-[23px] pl-[20px] text-[#8C8C8C] ${
            !showMore && 'hidden'
          }`}
        >
          <div className="w-[5px] h-[5px] relative">
            <div className="w-[10px]  absolute bottom-[-2.5px] left-[-2.5px]">
              <Image
                src={IconLock}
                width={10}
                alt="iconLock"
                className=""
              ></Image>
            </div>
          </div>
          <span className="ml-[10px]">
            {v.label}
            {` (Lv${v.level})`}
          </span>
        </li>
      );
    }
  };
  return (
    <div className="flex flex-col items-start w-full mt-[40px]">
      <div className="flex items-center gap-[5px] text-[#000] leading-[23px] mb-[5px]">
        <span>Your HackQuest rights as a Web3 Newbie</span>
        <div className="w-[40px] h-[40px] flex-center  relative left-[-15px] cursor-pointer group">
          <Image src={IconTip} width={10} alt="iconTip"></Image>
          <div
            className="absolute z-20 right-[-416px] top-[-30px] hidden group-hover:block w-[415px]  bg-[#fff] rounded-[10px] p-[20px]"
            style={{
              boxShadow: `0 1px 6px #dadada`
            }}
          >
            <div className="flex mt-[-15px] pb-[5px] border-b border-[#8C8C8C]">
              <div className="w-[45px]">Level</div>
              <div className="w-[115px]">Role</div>
              <div className="w-[215px]">Rights</div>
            </div>
            <div className="text-[12px] font-next-book-Thin">
              {equityTip.map((v, i) => (
                <div
                  key={i}
                  className={`flex py-[5px] ${
                    i && ' border-t-[0.5px] border-[#8C8C8C]'
                  }`}
                >
                  <div className="w-[45px]">{v.level}</div>
                  <div className="w-[115px]">{v.role}</div>
                  <div className="w-[215px]">
                    {v.rights.map((r, j) => (
                      <p key={j}>{r}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-30 top-[3px] right-[-3px] hidden group-hover:block  w-0 h-0 border-t-[17px] border-t-transparent border-b-[17px] border-b-transparent border-l-[17px] border-l-transparent border-r-[17px] border-r-[#fff]"></div>
        </div>
      </div>
      <ul>{equityList.map((v, i) => renderEquity(v, i))}</ul>
      <div className="flex justify-end w-full pt-[4px]">
        <span
          className="text-[12px] text-[#000] underline cursor-pointer"
          onClick={() => handleShowMore()}
        >
          Show {showMore ? 'Less' : 'More'}
        </span>
      </div>
    </div>
  );
};

export default Equity;
