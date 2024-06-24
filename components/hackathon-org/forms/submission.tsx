'use client';

import * as React from 'react';
import submissions from '@/components/hackathon-org/constants/submissions.json';
import { SelectableCard } from '@/components/hackathon-org/common/selectable-card';
import { useToggle } from '@/hooks/utils/use-toggle';
import { ActionButtons } from './action-buttons';
import { EditCustomFieldModal } from '../modals/edit-custom-field-modal';
import { AddFieldButton } from '../common/add-field-button';
import { SubmissionSectionConfig } from '@/components/HackathonCreation';

export function SubmissionForm({
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
  console.log(SubmissionSectionConfig);
  return (
    <div className="flex flex-col gap-6">
      <label className="body-l text-neutral-off-black">
        Select the profile fields you wish to make mandatory in your hackathon application. The shorter your form is,
        the faster you stack up the applications.
      </label>
      <div className="w-full">
        <label className="body-m text-neutral-off-black">Basic Info</label>
        <div className="mt-1 grid w-full grid-cols-3 gap-3">
          {submissions.basic_info.map((item) => (
            <SelectableCard key={item.value} label={item.label} disabled={item.required} />
          ))}
          <AddFieldButton iconOnly onClick={() => toggle(true)} />
        </div>
      </div>
      <div className="w-full">
        <label className="body-m text-neutral-off-black">Project Detail</label>
        <div className="mt-1 grid w-full grid-cols-3 gap-3">
          {submissions.project_detail.map((item) => (
            <SelectableCard key={item.value} label={item.label} disabled={item.required} />
          ))}
          <AddFieldButton iconOnly onClick={() => toggle(true)} />
        </div>
      </div>
      <div className="w-full">
        <label className="body-m text-neutral-off-black">Additions</label>
        <div className="mt-1 grid w-full grid-cols-3 gap-3">
          {submissions.additions.map((item) => (
            <SelectableCard key={item.value} label={item.label} disabled={item.required} />
          ))}
          <AddFieldButton iconOnly onClick={() => toggle(true)} />
        </div>
      </div>
      <ActionButtons isEditMode={false} isValid />
      <EditCustomFieldModal open={open} onClose={() => toggle(false)} />
    </div>
  );
}
