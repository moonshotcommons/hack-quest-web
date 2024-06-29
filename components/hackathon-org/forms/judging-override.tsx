'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ActionButtons } from './action-buttons';
import { EditJudgingDetailModal } from '../modals/edit-judging-detail-modal';
import { useToggle } from '@/hooks/utils/use-toggle';

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
  console.log(initialValues?.rewards);
  const [value, setValue] = React.useState<any>({});
  const [open, toggle] = useToggle(false);
  return (
    <div className="flex flex-col gap-6">
      {/* <NoTrack /> */}
      {initialValues?.rewards?.length > 0 ? (
        initialValues?.rewards?.map((reward: any) => (
          <div
            key={reward.id}
            className="flex items-center justify-between rounded-2xl border border-neutral-light-gray p-5"
          >
            <h2 className="text-lg font-bold text-neutral-rich-gray">{reward?.name}</h2>
            <Button
              size="small"
              onClick={() => {
                setValue({
                  id: reward?.id,
                  hackathonId: reward?.hackathonId,
                  name: reward?.name
                });
                toggle(true);
              }}
            >
              Set judging details
            </Button>
          </div>
        ))
      ) : (
        <NoTrack />
      )}
      <div className="flex justify-end">
        <ActionButtons isLastStep isEditMode={isEditMode} />
      </div>
      <EditJudgingDetailModal initialValues={value} open={open} onOpenChange={toggle} />
    </div>
  );
}
