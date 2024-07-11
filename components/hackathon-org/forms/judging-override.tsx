'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ActionButtons } from './action-buttons';
import { EditJudgingDetailModal } from '../modals/edit-judging-detail-modal';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';
import { createEditor } from '@wangeditor/editor';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';

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

function UpdateJudgeDetail({ data, onClick }: { data: any; onClick?: () => void }) {
  const isEdit = data?.disableJudge !== undefined && !!data?.criteria;
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-neutral-light-gray p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-rich-gray">{data?.rewardName}</h2>
        <Button
          variant={isEdit ? 'outline' : 'primary'}
          size="small"
          className={isEdit ? 'w-[140px]' : 'w-[162px]'}
          onClick={onClick}
        >
          {isEdit ? 'Edit' : 'Set judging details'}
        </Button>
      </div>
      {data?.disableJudge
        ? // <div className="flex items-center justify-center gap-1 rounded-2xl bg-neutral-off-white p-4 text-sm text-neutral-medium-gray">
          //   <InfoIcon size={16} />
          //   <p>HackQuest voting and judging system will not be applied to this track.</p>
          // </div>
          data?.criteria && (
            <div className="flex flex-col gap-1">
              <span className="text-neutral-medium-gray">Judging Criteria</span>
              {data.criteria?.type === TEXT_EDITOR_TYPE ? (
                <p
                  className="body-m reset-editor-style text-neutral-rich-gray"
                  dangerouslySetInnerHTML={{
                    __html: createEditor({ content: data.criteria?.content || [] }).getHtml()
                  }}
                ></p>
              ) : (
                <p className="body-m text-neutral-rich-gray">{data?.criteria}</p>
              )}
            </div>
          )
        : isEdit && (
            <>
              {data?.criteria && (
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-medium-gray">Judging Criteria</span>
                  {data.criteria?.type === TEXT_EDITOR_TYPE ? (
                    <p
                      className="body-m reset-editor-style text-neutral-rich-gray"
                      dangerouslySetInnerHTML={{
                        __html: createEditor({ content: data.criteria?.content || [] }).getHtml()
                      }}
                    ></p>
                  ) : (
                    <p className="body-m text-neutral-rich-gray">{data?.criteria}</p>
                  )}
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
              <div className="flex gap-20">
                {data?.judgeProjectVote && (
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-medium-gray">
                      MAX Votes Per Project Per {data?.judgeMode === 'all' ? 'User/Judge' : 'Judge'}
                    </span>
                    <span>{data?.judgeProjectVote}</span>
                  </div>
                )}
                {data?.votesProportion?.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-medium-gray">User Votes Ratio</span>
                    <span>{data?.votesProportion[0]}%</span>
                  </div>
                )}
                {data?.votesProportion?.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-medium-gray">Judge Votes Ratio</span>
                    <span>{data?.votesProportion[1]}%</span>
                  </div>
                )}
                {data?.projectJudgeCount && (
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-medium-gray">Judges Needed for Each Project</span>
                    <span>{data?.projectJudgeCount}</span>
                  </div>
                )}
              </div>
              {data?.judgeAccounts?.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-medium-gray">Judging Accounts</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-1">
                    {data?.judgeAccounts?.map((account: any) => (
                      <span key={account.id} className="text-neutral-off-black">
                        {account.email}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
    </div>
  );
}

export function JudgingOverrideForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave,
  refresh
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
  refresh?: () => void;
}) {
  const [value, setValue] = React.useState<any>({});
  const [open, toggle] = useToggle(false);
  const { onStepChange } = useHackathonOrgState();

  const isAllSelected = initialValues?.judge?.some((item: any) => item?.judgeMode === 'all');

  const judges = initialValues?.judge?.map((item: any) => {
    return {
      ...item,
      disabledAll: !item?.judgeMode ? isAllSelected : item?.judgeMode === 'all' ? false : isAllSelected
    };
  });

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.REWARDS);
  }

  return (
    <div className="flex flex-col gap-6">
      {judges?.length === 0 && <NoTrack />}
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
        <ActionButtons isLastStep isEditMode={isEditMode} onCancelOrBack={onCancelOrBack} onSaveOrNext={onSave} />
      </div>
      <EditJudgingDetailModal
        key={Math.random()}
        initialValues={value}
        open={open}
        refresh={refresh}
        onClose={() => {
          toggle(false);
          setValue({});
        }}
      />
    </div>
  );
}
