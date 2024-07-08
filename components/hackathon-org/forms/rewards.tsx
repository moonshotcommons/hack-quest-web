'use client';

import * as React from 'react';
import { message } from 'antd';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Separator } from '@/components/ui/separator';
import webApi from '@/service';
import { ActionButtons } from './action-buttons';
import { EditTrackModal } from '../modals/edit-track-modal';
import { AddFieldButton } from '../common/add-field-button';
import { ConfirmModal } from '../modals/confirm-modal';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';
import { separationNumber } from '@/helper/utils';

function TrackPreview({ track, refresh }: { track: any; refresh?: () => void }) {
  const [editModalOpen, toggleEditModalOpen] = useToggle(false);
  const [removeModalOpen, toggleRemoveModalOpen] = useToggle(false);

  const querClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['removeHackathonRewards', track?.hackathonId, track?.id],
    mutationFn: () => webApi.hackathonV2Api.removeHackathonRewards(track?.hackathonId, track?.id),
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ['hackathon'] });
      refresh?.();
      message.success('Rewards removed successfully');
    }
  });

  const initialValues = React.useMemo(() => {
    return {
      isEditing: true,
      ...track
    };
  }, [track]);

  return (
    <React.Fragment>
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-neutral-light-gray bg-neutral-white px-8 pb-4 pt-8">
        <div className="grid h-full w-full grid-cols-[auto_1px_420px] gap-5">
          <div className="flex flex-col items-center justify-center px-2">
            <h2 className="headline-h3 text-neutral-off-black">
              {separationNumber(track?.totalRewards || 0)} {track?.currency}
            </h2>
            <span className="body-m text-neutral-medium-gray">{track?.name}</span>
          </div>
          <Separator orientation="vertical" />
          {track?.mode === 'RANK' ? (
            <ul className="flex flex-col gap-1">
              {track?.rewards?.map((reward: any, index: number) => (
                <li className="flex items-center justify-between" key={reward?.id}>
                  <span className="body-m text-neutral-medium-gray">{reward?.label}</span>
                  <span className="body-l text-neutral-off-black">
                    {separationNumber(Number(reward?.value || 0))} {track?.currency}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="body-m text-neutral-off-black">{track?.rule}</p>
          )}
        </div>
        <div className="flex justify-end gap-4 text-neutral-rich-gray [&_button]:underline [&_button]:outline-none">
          <button onClick={toggleEditModalOpen}>Edit</button>
          <button onClick={toggleRemoveModalOpen}>Remove</button>
        </div>
      </div>
      <ConfirmModal
        open={removeModalOpen}
        onConfirm={() => mutation.mutate()}
        isLoading={mutation.isPending}
        onClose={() => toggleRemoveModalOpen(false)}
      >
        Are you sure you want to remove this track?
      </ConfirmModal>
      <EditTrackModal
        initialValues={initialValues}
        open={editModalOpen}
        onClose={() => toggleEditModalOpen(false)}
        refresh={refresh}
      />
    </React.Fragment>
  );
}

export function RewardsForm({
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
  const { updateStatus, onStepChange } = useHackathonOrgState();
  const [open, toggle] = useToggle(false);

  const isValid = initialValues?.rewards?.length > 0;

  // React.useEffect(() => {
  //   if (!isEditMode) {
  //     if (isValid) {
  //       updateStatus(Steps.REWARDS, true);
  //     } else {
  //       updateStatus(Steps.REWARDS, false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isValid, isEditMode]);

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.SUBMISSION);
  }

  function onSaveOrNext() {
    if (!isValid) {
      message.warning('Please add at least one track');
      return;
    }
    isEditMode ? onSave?.() : onStepChange(Steps.JUDGING);
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="body-l text-neutral-off-black">Please add at least one prize track</label>
      {isValid &&
        initialValues?.rewards?.map((track: any) => <TrackPreview key={track?.id} track={track} refresh={refresh} />)}
      <AddFieldButton size="large" onClick={toggle}>
        Add a new track
      </AddFieldButton>
      <ActionButtons
        isValid={isValid}
        isEditMode={isEditMode}
        onCancelOrBack={onCancelOrBack}
        onSaveOrNext={onSaveOrNext}
      />
      <EditTrackModal initialValues={initialValues} open={open} onClose={() => toggle(false)} refresh={refresh} />
    </div>
  );
}
