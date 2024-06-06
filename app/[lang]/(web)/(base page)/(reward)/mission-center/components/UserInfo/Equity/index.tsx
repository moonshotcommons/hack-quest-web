import React, { useContext, useState } from 'react';
import Image from 'next/image';
import IconTip from '@/public/images/mission-center/icon_tip.svg';
import IconLock from '@/public/images/mission-center/icon_lock.png';
import { equityList, EquityListType, equityTip } from './data';
import { BurialPoint } from '@/helper/burialPoint';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface EquityProp {
  level: number;
}
const Equity: React.FC<EquityProp> = ({ level }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
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
        <li key={i} className={`flex items-center pl-[20px] leading-[23px]`}>
          <span className="h-[5px] w-[5px] rounded-[50%] bg-neutral-black"></span>
          <span className="ml-[10px]">{t(v.label)}</span>
        </li>
      );
    } else {
      return (
        <li
          key={i}
          className={`flex items-center pl-[20px] leading-[23px] text-neutral-medium-gray ${!showMore && 'hidden'}`}
        >
          <div className="relative h-[5px] w-[5px]">
            <div className="absolute  bottom-[-2.5px] left-[-2.5px] w-[10px]">
              <Image src={IconLock} width={10} alt="iconLock" className=""></Image>
            </div>
          </div>
          <span className="ml-[10px]">
            {t(v.label)}
            {` (Lv${v.level})`}
          </span>
        </li>
      );
    }
  };
  return (
    <div className="mt-[40px] flex w-full flex-col items-start">
      <div className="mb-[5px] flex items-center gap-[5px] leading-[23px] text-neutral-black">
        <span>{t('yourHackQuestrights')}</span>
        <div className="flex-center group relative  left-[-15px] h-[40px] w-[40px] cursor-pointer">
          <Image src={IconTip} width={10} alt="iconTip"></Image>
          <div
            className="absolute right-[-416px] top-[-30px] z-20 hidden w-[415px] rounded-[10px]  bg-neutral-white p-[20px] group-hover:block"
            style={{
              boxShadow: `0 1px 6px #dadada`
            }}
          >
            <div className="mt-[-15px] flex border-b border-neutral-medium-gray pb-[5px]">
              <div className="w-[45px]">{t('level')}</div>
              <div className="w-[115px]">{t('role')}</div>
              <div className="w-[215px]">{t('rights')}</div>
            </div>
            <div className="body-xs">
              {equityTip.map((v, i) => (
                <div key={i} className={`flex py-[5px] ${i && ' border-t-[0.5px] border-neutral-medium-gray'}`}>
                  <div className="w-[45px]">{v.level}</div>
                  <div className="w-[115px]">{t(v.role)}</div>
                  <div className="w-[215px]">
                    {v.rights.map((r, j) => (
                      <p key={j}>{t(r)}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-[-3px] top-[3px] z-30 hidden h-0  w-0 border-b-[17px] border-l-[17px] border-r-[17px] border-t-[17px] border-b-transparent border-l-transparent border-r-[#fff] border-t-transparent group-hover:block"></div>
        </div>
      </div>
      <ul>{equityList.map((v, i) => renderEquity(v, i))}</ul>
      <div className="flex w-full justify-end pt-[4px]">
        <span className="body-xs cursor-pointer text-neutral-black underline" onClick={() => handleShowMore()}>
          {showMore ? t('showLess') : t('showMore')}
        </span>
      </div>
    </div>
  );
};

export default Equity;
