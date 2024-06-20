'use client';

import * as React from 'react';
import { useToggle } from '@/hooks/utils/use-toggle';
import { ActionButtons } from './action-buttons';
import { EditTrackModal } from '../modals/edit-track-modal';
import { AddFieldButton } from '../common/add-field-button';

export function RewardsForm({
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
  const [open, toggle] = useToggle(false);
  return (
    <div className="flex flex-col gap-6">
      <label className="body-l text-neutral-off-black">Please add at least one prize track</label>
      <AddFieldButton size="large" onClick={toggle}>
        Add a new track
      </AddFieldButton>
      <ActionButtons isValid isEditMode={false} />
      <EditTrackModal open={open} onClose={() => toggle(false)} />
    </div>
  );
}
