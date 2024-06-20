'use client';

import * as React from 'react';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { RadioGroup, RadioGroupItem } from '@/components/hackathon-org/common/radio-group';
import { Timezone } from '@/components/hackathon-org/common/timezone';
import { Separator } from '@/components/ui/separator';

function SameCloseTime() {
  return (
    <div>
      <h1>same close time</h1>
      <h1>same close time</h1>
      <h1>same close time</h1>
      <h1>same close time</h1>
      <h1>same close time</h1>
    </div>
  );
}

function DifferentCloseTime() {
  return (
    <div>
      <h1>different close time</h1>
    </div>
  );
}

export function TimelineForm({
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
  const [value, setValue] = React.useState('no');
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col gap-1">
        <label className="body-m text-neutral-off-black">Timezone*</label>
        <Timezone />
      </div>
      <Separator />
      <RadioGroup value={value} onValueChange={setValue} className="w-full grid-cols-2">
        <RadioGroupItem value="no">No, their open and close time is different</RadioGroupItem>
        <RadioGroupItem value="yes">Yes, their open and close time is the same</RadioGroupItem>
      </RadioGroup>
      <Separator />
      <ResizablePanel.Root value={value} className="pb-2">
        <ResizablePanel.Content value="no">
          <SameCloseTime />
        </ResizablePanel.Content>
        <ResizablePanel.Content value="yes">
          <DifferentCloseTime />
        </ResizablePanel.Content>
      </ResizablePanel.Root>
    </div>
  );
}
