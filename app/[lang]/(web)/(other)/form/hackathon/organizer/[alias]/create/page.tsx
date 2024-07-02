'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { MoveRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Stepper from '@/components/hackathon-org/common/stepper';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { BasicInfoForm } from '@/components/hackathon-org/forms/basic-info';
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
import { JudgingOverrideForm } from '@/components/hackathon-org/forms/judging-override';
import { Spinner } from '@/components/ui/spinner';
import MenuLink from '@/constants/MenuLink';

function TabWrapper({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return <div className={cn('w-full', visible ? 'block' : 'hidden')}>{children}</div>;
}

export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const { alias } = useParams<{ alias: string }>();
  const { step, status, onStepChange, updateStatus, reset } = useHackathonOrgState();

  const { data, isLoading } = useQuery({
    enabled: !!alias,
    staleTime: Infinity,
    queryKey: ['hackathon', alias],
    queryFn: () => webApi.hackathonV2Api.getHackathon(alias)
  });

  React.useEffect(() => {
    data?.progress.forEach((item) => {
      updateStatus(item, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1 py-20">
        <Spinner size={40} />
      </div>
    );
  }

  function currentStep(step: string) {
    return STEP_ITEMS.findIndex((item) => item.value === step) + 1;
  }

  function goToHackathonDetailPage() {
    startTransition(() => {
      router.push(`${MenuLink.HACKATHON}/${alias}`);
    });
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
        <Button
          isLoading={isPending}
          disabled={currentStep(step) !== STEP_ITEMS.length}
          className="w-60"
          onClick={goToHackathonDetailPage}
        >
          finish setup {currentStep(step)}/8
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
        className={cn('w-full rounded-2xl bg-neutral-white p-10', {
          'rounded-tl-none': currentStep(step) === 1,
          'rounded-tr-none': currentStep(step) === STEP_ITEMS.length
        })}
      >
        <TabWrapper visible={step === Steps.BASIC_INFO}>
          <BasicInfoForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.LINKS}>
          <LinksForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.COVER}>
          <CoverForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.TIMELINE}>
          <TimelineForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.APPLICATION}>
          <ApplicationForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.SUBMISSION}>
          <SubmissionForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.REWARDS}>
          <RewardsForm initialValues={data} />
        </TabWrapper>
        <TabWrapper visible={step === Steps.JUDGING}>
          <JudgingOverrideForm initialValues={data} />
        </TabWrapper>
      </div>
    </div>
  );
}
