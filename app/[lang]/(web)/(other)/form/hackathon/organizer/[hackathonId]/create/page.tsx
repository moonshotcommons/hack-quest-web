'use client';

import * as React from 'react';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import * as Stepper from '@/components/hackathon-org/common/stepper';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { BasicInfoForm } from '@/components/hackathon-org/forms/basic-info';
import { JudgingForm } from '@/components/hackathon-org/forms/judging';
import { cn } from '@/helper/utils';
import { LinksForm } from '@/components/hackathon-org/forms/links';
import { CoverForm } from '@/components/hackathon-org/forms/cover';
import { TimelineForm } from '@/components/hackathon-org/forms/timeline';
import { RewardsForm } from '@/components/hackathon-org/forms/rewards';
import { ApplicationForm } from '@/components/hackathon-org/forms/application';
import { SubmissionForm } from '@/components/hackathon-org/forms/submission';
import { STEP_ITEMS, Steps } from '@/components/hackathon-org/constants/steps';
import { useHackathonOrgState } from '@/components/hackathon-org/constants/state';

export default function Page() {
  const { currentStep, status, onChangeStep } = useHackathonOrgState();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="headline-h3">Shanghai Hackathon 2024</h2>
          <p className="flex items-center gap-4 text-center text-sm font-light text-neutral-black">
            Need any help?{' '}
            <Link
              aria-label="Join Discord"
              href={HACKQUEST_DISCORD}
              target="_blank"
              className="flex items-center gap-1.5"
            >
              Join Discord <MoveRightIcon className="h-4 w-4" />
            </Link>
          </p>
        </div>
        <Button disabled={currentStep !== Steps.SUBMISSION} className="w-60">
          finish setup {currentStep}/8
        </Button>
      </div>
      <Stepper.Root value={currentStep}>
        {STEP_ITEMS.map((item) => (
          <Stepper.Item
            completed={status[item.value]}
            key={item.value}
            value={item.value}
            onClick={() => onChangeStep(item.value)}
          >
            {item.label}
          </Stepper.Item>
        ))}
      </Stepper.Root>
      <div
        className={cn('w-full rounded-2xl bg-neutral-white p-10', {
          'rounded-tl-none': currentStep === Steps.BASIC_INFO,
          'rounded-tr-none': currentStep === Steps.SUBMISSION
        })}
      >
        <ResizablePanel.Root value={currentStep} className="pb-2">
          <ResizablePanel.Content value={Steps.BASIC_INFO}>
            <BasicInfoForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.JUDGING}>
            <JudgingForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.LINKS}>
            <LinksForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.COVER}>
            <CoverForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.TIMELINE}>
            <TimelineForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.REWARDS}>
            <RewardsForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.APPLICATION}>
            <ApplicationForm />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.SUBMISSION}>
            <SubmissionForm />
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </div>
    </div>
  );
}
