'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Steps } from '../common/steps';
import { OnboardingModal } from '../modals/onboarding-modal';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useProfile } from './profile-provider';

export function CompleteProfile() {
  const [open, toggle] = useToggle(false);
  const { profile } = useProfile();

  React.useEffect(() => {
    if (!localStorage.getItem('completeProfile') && !profile?.progress?.length && profile?.isCurrentUser) {
      setTimeout(() => {
        toggle(true);
      }, 1000);
      localStorage.setItem('completeProfile', 'true');
    }
  }, [profile?.isCurrentUser, profile?.progress, toggle]);

  return (
    <div className="mb-2 flex w-full flex-col-reverse justify-between bg-yellow-extra-light px-5 py-4 sm:mb-[60px] sm:flex-row sm:items-center sm:rounded-2xl sm:p-6">
      <div className="mt-3 flex flex-col sm:mt-0">
        <h3 className="text-base font-bold sm:text-lg">Complete Profile ({profile?.progress?.length}/3)</h3>
        <p className="mt-2 text-sm text-neutral-rich-gray">Only a few steps toward your web3 builder profile</p>
        <Button size="small" className="mt-3 w-[140px] sm:mt-6" onClick={() => toggle(true)}>
          Continue
        </Button>
      </div>
      <Steps currentStep={profile?.progress?.length || 0} />
      <OnboardingModal open={open} onClose={() => toggle(false)} />
    </div>
  );
}
