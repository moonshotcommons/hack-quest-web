'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LoaderIcon, MoveRightIcon } from 'lucide-react';
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
import webApi from '@/service';

function PageSkeleton() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 py-40">
      <LoaderIcon className="animate-spin" />
      <span className="text-base">Loading...</span>
    </div>
  );
}

export default function Page() {
  const { hackathonId } = useParams<{ hackathonId: string }>();
  const { step, status, onStepChange } = useHackathonOrgState();

  const { data, isLoading } = useQuery({
    enabled: !!hackathonId,
    staleTime: Infinity,
    queryKey: ['hackathon', hackathonId],
    queryFn: () => webApi.hackathonV2Api.getHackathon(hackathonId)
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="headline-h3">{data?.name}</h2>
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
        <Button disabled={step !== Steps.SUBMISSION} className="w-60">
          finish setup {step}/8
        </Button>
      </div>
      <Stepper.Root value={step}>
        {STEP_ITEMS.map((item) => (
          <Stepper.Item
            completed={status[item.value]}
            key={item.value}
            value={item.value}
            onClick={() => onStepChange(item.value)}
          >
            {item.label}
          </Stepper.Item>
        ))}
      </Stepper.Root>
      <div
        className={cn('w-full rounded-2xl bg-neutral-white px-8 py-10', {
          'rounded-tl-none': step === Steps.BASIC_INFO,
          'rounded-tr-none': step === Steps.SUBMISSION
        })}
      >
        <ResizablePanel.Root value={step} className="px-2 pb-2">
          <ResizablePanel.Content value={Steps.BASIC_INFO}>
            <BasicInfoForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.JUDGING}>
            <JudgingForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.LINKS}>
            <LinksForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.COVER}>
            <CoverForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.TIMELINE}>
            <TimelineForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.REWARDS}>
            <RewardsForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.APPLICATION}>
            <ApplicationForm initialValues={data} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value={Steps.SUBMISSION}>
            <SubmissionForm initialValues={data} />
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </div>
    </div>
  );
}
