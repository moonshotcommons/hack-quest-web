'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { OTPInput } from '@/components/shared/otp-input';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { useToggle } from '@/hooks/utils/use-toggle';

function Form({ onNext }: { onNext: () => void }) {
  const [invalid, toggle] = useToggle(false);
  const [code, setCode] = React.useState('');
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col space-y-5 text-center">
        <h2 className="headline-h4">Verify Your Contact Email</h2>
        <p className="body-m text-center">
          Please enter the six-digit verification code we just sent to abcdefg@gmail.com
        </p>
      </div>
      <div className="flex flex-col items-center gap-9">
        <OTPInput aria-invalid={invalid} onValueChange={setCode} />
        <Button className="w-60" onClick={onNext}>
          Resend
        </Button>
      </div>
    </div>
  );
}

function Success({ onPrevious }: { onPrevious: () => void }) {
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="flex flex-col space-y-5 text-center">
        <h2 className="headline-h4">Email Verified! 🎉</h2>
        <p className="body-m">
          You have been successfully verified the email! This window will be closed in 5 seconds.
        </p>
      </div>
      <Button variant="outline" className="w-60" onClick={onPrevious}>
        close (5s)
      </Button>
    </div>
  );
}

export function VerifyEmail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, setState] = React.useState<'form' | 'success'>('form');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[532px] max-w-[532px] gap-5 px-5 py-10 shadow-modal">
        <ResizablePanel.Root value={state} className="pb-2">
          <ResizablePanel.Content value="form">
            <Form onNext={() => setState('success')} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value="success">
            <Success onPrevious={() => setState('form')} />
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </DialogContent>
    </Dialog>
  );
}
