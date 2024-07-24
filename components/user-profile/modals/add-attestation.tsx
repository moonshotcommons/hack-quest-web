'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { MobileModalHeader } from './mobile-modal-header';
import { AttestButton } from '../common/attest-button';
import { ChevronIcon } from '@/components/ui/icons/chevron';
import { Label } from '@/components/ui/label';
import { Textarea } from '../common/textarea';
import { Button } from '@/components/ui/button';
import { RadioCards, RadioCardsItem } from '@/components/shared/radio-cards';

function Step1() {
  return (
    <React.Fragment>
      <h2 className="mt-6 shrink-0 text-lg font-bold sm:text-[22px]">Add an Attestation</h2>
      <div className="flex flex-1 flex-col gap-6">
        <RadioCards>
          <RadioCardsItem
            value="1"
            className="flex items-center gap-4 aria-checked:border-status-success-dark aria-checked:bg-status-success-light"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-status-success-light">
              <ChevronIcon className="h-6 w-6 text-status-success-dark" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-left font-bold">Attest True</span>
              <span className="text-xs text-neutral-medium-gray">Share good comments about experience</span>
            </div>
          </RadioCardsItem>
          <RadioCardsItem
            value="2"
            className="flex items-center gap-4 aria-checked:border-status-error-dark aria-checked:bg-status-error-light"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-status-error-light">
              <ChevronIcon className="h-6 w-6 rotate-180 text-status-error-dark" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-left font-bold">Attest False</span>
              <span className="text-xs text-neutral-medium-gray">Add comments about experience</span>
            </div>
          </RadioCardsItem>
        </RadioCards>
        <div className="flex flex-col gap-2">
          <Label className="text-base font-bold">Add Comment (Optional)</Label>
          <Textarea placeholder="Add comments....." className="min-h-24" />
        </div>
      </div>
      <Button className="w-full shrink-0 sm:w-[165px] sm:self-end">Continue</Button>
    </React.Fragment>
  );
}

function Step2() {
  return null;
}

function Step3() {
  return null;
}

function Step4() {
  return null;
}

const steps = [Step1, Step2, Step3, Step4];

export function AddAttestation() {
  const [step, setStep] = React.useState(1);

  const Component = steps[step - 1] || null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AttestButton />
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col gap-5 px-5 pt-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-8 sm:p-12">
        <MobileModalHeader />
        {/* <Steps currentStep={step} /> */}
        <Component />
      </DialogContent>
    </Dialog>
  );
}
