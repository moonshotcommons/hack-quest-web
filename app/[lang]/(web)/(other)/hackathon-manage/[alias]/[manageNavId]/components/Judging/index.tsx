'use client';
import React, { useEffect, useState } from 'react';
import Tab from '../Tab';
import { Checkbox } from '@/components/ui/checkbox';
import VoteCloseIn from './VoteCloseIn';
import JudgInfo from './JudgInfo';
import JudgesModal from './JudgesModal';
import { SubmissionStatusType } from '@/service/webApi/resourceStation/type';
import { AuditTabType } from '../../../../constants/type';
import webApi from '@/service';
import { useQueries } from '@tanstack/react-query';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { useShallow } from 'zustand/react/shallow';
import WinnerBelow from './WinnerBelow';

interface JudgingProp {}

const Judging: React.FC<JudgingProp> = () => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [{ data: tabData = [] }] = useQueries({
    queries: [
      {
        enabled: !!hackathon?.id,
        queryKey: ['prizeTracks', hackathon?.id],
        queryFn: () => webApi.resourceStationApi.getHackathonSubmissionStatus(hackathon.id),
        select: (data: SubmissionStatusType[]) => {
          const newData: AuditTabType[] = data.map((v) => ({
            label: v.name,
            value: v.name,
            count: v.projectCount
          }));
          return newData;
        }
      }
    ]
  });

  useEffect(() => {
    if (tabData.length) {
      setStatus(tabData[0].value);
    }
  }, [tabData]);
  return (
    <div className="flex h-full flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <Tab curTab={status} tabs={tabData} changeTab={(tab) => setStatus(tab)} />
        <div
          className={`body-s flex cursor-pointer items-center  gap-[8px] ${isShowDetail ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}
          onClick={() => setIsShowDetail(!isShowDetail)}
        >
          <Checkbox checked={isShowDetail} />
          <span>Show judging details</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[28px] pb-[40px]">
        <VoteCloseIn />
        <JudgInfo show={isShowDetail} handleShowJudges={() => setOpen(true)} />
        {/* <Voting /> */}
        {/* <WinnerView /> */}
        <WinnerBelow />
      </div>
      <JudgesModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Judging;
