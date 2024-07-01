'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ActionButtons } from './action-buttons';
import { EditJudgingDetailModal } from '../modals/edit-judging-detail-modal';
import { useToggle } from '@/hooks/utils/use-toggle';
import { InfoIcon } from 'lucide-react';

function NoTrack() {
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <h2 className="text-lg font-bold">There is no track added.</h2>
      <p className="text-neutral-rich-gray">
        Please add tracks in ‘Rewards’. Then you can add judging details for each track.
      </p>
    </div>
  );
}

function SetJudgeDetail({ data, onClick }: { data: any; onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-light-gray p-5">
      <h2 className="text-lg font-bold text-neutral-rich-gray">{data?.name}</h2>
      <Button size="small" onClick={onClick}>
        Set judging details
      </Button>
    </div>
  );
}

function UpdateJudgeDetail({ data, onClick }: { data: any; onClick?: () => void }) {
  const isEdit = data?.disableJudge !== undefined && !!data?.resource;
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-neutral-light-gray p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-rich-gray">{data?.name}</h2>
        <Button variant={isEdit ? 'outline' : 'primary'} size="small" className="w-[140px]" onClick={onClick}>
          {isEdit ? 'Edit' : 'Set judging details'}
        </Button>
      </div>
      {data?.disableJudge ? (
        <div className="flex items-center justify-center gap-1 rounded-2xl bg-neutral-off-white p-4 text-sm text-neutral-medium-gray">
          <InfoIcon size={16} />
          <p>HackQuest voting and judging system will not be applied to this track.</p>
        </div>
      ) : (
        <>
          {data?.resource && (
            <div className="flex flex-col gap-1">
              <span className="text-neutral-medium-gray">Judging Criteria</span>
              <p className="body-m text-neutral-rich-gray">{data?.resource}</p>
            </div>
          )}
          <div className="flex gap-20">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-medium-gray">Judging Mode</span>
              <span>{data?.judgeMode === 'all' ? 'Users + Judges' : 'Judges Only'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-medium-gray">Voting Mode</span>
              <span>{data?.voteMode === 'fixed' ? 'Fixed Number of Vote' : 'Project Scoring'}</span>
            </div>
            {data?.judgeTotalVote && (
              <div className="flex flex-col gap-1">
                <span className="text-neutral-medium-gray">Each Judge’s Votes</span>
                <span>{data?.judgeTotalVote}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function JudgingOverrideForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  console.log(initialValues?.judge);
  const [value, setValue] = React.useState<any>({});
  const [open, toggle] = useToggle(false);

  const judges = initialValues?.judge?.map((item: any) => {
    const relatedItem = initialValues?.rewards?.find((i: any) => i?.id === item?.rewardId);
    if (relatedItem) {
      return {
        ...item,
        name: relatedItem?.name
      };
    }
  });

  console.log(judges);

  return (
    <div className="flex flex-col gap-6">
      {judges?.map((data: any) => (
        <UpdateJudgeDetail
          key={data?.id}
          data={data}
          onClick={() => {
            setValue(data);
            toggle(true);
          }}
        />
      ))}
      <div className="flex justify-end">
        <ActionButtons isLastStep isEditMode={isEditMode} />
      </div>
      <EditJudgingDetailModal initialValues={value} open={open} onOpenChange={toggle} />
    </div>
  );
}
