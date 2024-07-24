'use client';
import React, { useState } from 'react';
import { hackathonSortData, submissionTabData } from '../../../../constants/data';
import Tab from '../Tab';
import { Checkbox } from '@/components/ui/checkbox';
import VoteCloseIn from './VoteCloseIn';
import JudgInfo from './JudgInfo';
import JudgesModal from './JudgesModal';
import Voting from './Voting';

interface JudgingProp {}

const Judging: React.FC<JudgingProp> = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    status: submissionTabData[0].value,
    sort: hackathonSortData[0].value,
    tracks: [],
    keyword: ''
  });
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <Tab
          curTab={searchInfo.status}
          tabs={submissionTabData}
          changeTab={(tab) =>
            setSearchInfo({
              ...searchInfo,
              status: tab
            })
          }
        />
        <div
          className={`body-s flex cursor-pointer items-center  gap-[8px] ${isShowDetail ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
          onClick={() => setIsShowDetail(!isShowDetail)}
        >
          <Checkbox checked={isShowDetail} />
          <span>Show judging details</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[28px]">
        <VoteCloseIn />
        <JudgInfo show={isShowDetail} handleShowJudges={() => setOpen(true)} />
        <Voting />
      </div>
      <JudgesModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Judging;
