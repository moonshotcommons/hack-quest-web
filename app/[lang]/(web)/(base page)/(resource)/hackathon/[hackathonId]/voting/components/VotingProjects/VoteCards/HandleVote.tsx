import React, { useContext, useState } from 'react';
import { HackathonVoteContext } from '../../../../../constants/type';
import { ViewValue } from '.';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import ArrowUp from '@/public/images/hackathon/arrow_up.svg';
import ArrowUpActive from '@/public/images/hackathon/arrow_up_active.svg';
import ArrowDown from '@/public/images/hackathon/arrow_down.svg';
import ArrowDownActive from '@/public/images/hackathon/arrow_down_active.svg';

interface HandleVoteProp {
  view: ViewValue;
}

const HandleVote: React.FC<HandleVoteProp> = ({ view }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setVoteData } = useContext(HackathonVoteContext);
  const [voteCount, setVoteCount] = useState(0);
  const maxCount = 10;
  const handleCount = (count: number) => {
    let newCount = voteCount + count;
    if (newCount < 0) newCount = 0;
    if (newCount > maxCount) newCount = maxCount;
    setVoteCount(newCount);
  };
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full items-center gap-[24px]">
        <div className={`flex justify-center ${view === ViewValue.AGENDA ? 'w-[32px]' : 'w-[23px]'}`}>
          <div
            className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[2px] ${view === ViewValue.AGENDA ? 'h-[20px] w-[20px]' : 'h-[14px] w-[14px]'}`}
            onClick={() => handleCount(-1)}
          >
            <Image src={voteCount > 0 ? ArrowDownActive : ArrowDown} fill alt={'handle-up'} className="object-cover" />
          </div>
        </div>

        <div
          className={`flex flex-1 items-center overflow-hidden rounded-[8px] border border-neutral-light-gray bg-neutral-white ${view === ViewValue.AGENDA ? 'body-s h-[46px]' : 'body-xs h-[27px]'}`}
        >
          <input
            className={`w-full text-center  outline-none `}
            value={voteCount}
            onChange={(e) => {
              let value = e.target.value;
              // 使用正则表达式匹配输入的值，判断是否为非负整数
              if (!/^\d*$/.test(value)) return;
              let v = value === '' ? '' : Number(value);
              if ((v as number) > maxCount) v = maxCount;
              setVoteCount(v as number);
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setVoteCount(0);
              }
            }}
          />
        </div>
        <div className={`flex justify-center ${view === ViewValue.AGENDA ? 'w-[32px]' : 'w-[23px]'}`}>
          <div
            className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[2px] ${view === ViewValue.AGENDA ? 'h-[20px] w-[20px]' : 'h-[14px] w-[14px]'}`}
            onClick={() => handleCount(1)}
          >
            <Image
              src={voteCount === maxCount ? ArrowUp : ArrowUpActive}
              fill
              alt={'handle-up'}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center text-neutral-off-black">
        <span
          className={`cursor-pointer text-center uppercase ${view === ViewValue.AGENDA ? 'underline-s w-[32px]' : 'caption-10pt w-[23px] underline'}`}
          onClick={() => setVoteCount(1)}
        >
          {t('min')}
        </span>
        <p
          className={`flex-1 text-center text-neutral-medium-gray ${view === ViewValue.AGENDA ? 'body-s ' : 'caption-10pt '}`}
        >
          {t('hackathonVoting.youVoted')}
        </p>
        <span
          className={`cursor-pointer text-center uppercase ${view === ViewValue.AGENDA ? 'underline-s w-[32px]' : 'caption-10pt w-[23px] underline'}`}
          onClick={() => setVoteCount(maxCount)}
        >
          {t('max')}
        </span>
      </div>
    </div>
  );
};

export default HandleVote;
