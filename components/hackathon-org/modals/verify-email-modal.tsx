'use client';

import * as React from 'react';
import { useCountDown } from 'ahooks';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { OTPInput } from '@/components/shared/otp-input';
import * as ResizablePanel from '@/components/shared/resizable-panel';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';

function Form({ email, hackathonId, onNext }: { email: string; hackathonId: string; onNext: () => void }) {
  const [code, setCode] = React.useState('');
  const [targetDate, setTargetDate] = React.useState(Date.now());
  const [invalid, toggle] = useToggle(false);

  const [_, formattedRes] = useCountDown({
    targetDate: targetDate + 60 * 1000
  });

  const { seconds } = formattedRes;

  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => webApi.hackathonV2Api.sendVerifyEmail(hackathonId, email),
    onSuccess: () => {
      setTargetDate(Date.now() + 60 * 1000);
    }
  });

  const mutation = useMutation({
    mutationFn: (code: string) => webApi.hackathonV2Api.checkEmail(hackathonId, code),
    onSuccess: () => {
      onNext();
    },
    onError: () => {
      toggle(true);
    }
  });

  React.useEffect(() => {
    if (code.length === 6) {
      mutation.mutate(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col space-y-5 text-center">
        <h2 className="headline-h4">Verify Your Contact Email</h2>
        <p className="body-m text-center">Please enter the six-digit verification code we just sent to {email}.</p>
      </div>
      <div className="flex flex-col items-center gap-9">
        <OTPInput aria-invalid={invalid} onValueChange={setCode} />
        <Button
          className="w-60"
          isLoading={sendEmailMutation.isPending}
          onClick={() => sendEmailMutation.mutate(email)}
          disabled={seconds > 0}
        >
          Resend {seconds > 0 && `(${seconds}s)`}
        </Button>
      </div>
    </div>
  );
}

function Success({ onClose }: { onClose: () => void }) {
  const [_, formattedRes] = useCountDown({
    leftTime: 5 * 1000,
    onEnd: () => onClose()
  });

  const { seconds } = formattedRes;

  return (
    <div className="flex flex-col items-center gap-9">
      <div className="flex flex-col space-y-5 text-center">
        <h2 className="headline-h4">Email Verified! 🎉</h2>
        <p className="body-m">
          You have been successfully verified the email! This window will be closed in 5 seconds.
        </p>
      </div>
      <Button variant="outline" className="w-60" onClick={onClose}>
        close ({seconds}s)
      </Button>
    </div>
  );
}

export function VerifyEmailModal({
  email,
  hackathonId,
  open,
  onClose
}: {
  email: string;
  hackathonId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [state, setState] = React.useState<'form' | 'success'>('form');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-5 px-5 py-10 shadow-modal sm:w-[532px] sm:max-w-[532px]">
        <ResizablePanel.Root value={state} className="pb-2">
          <ResizablePanel.Content value="form">
            <Form email={email} hackathonId={hackathonId} onNext={() => setState('success')} />
          </ResizablePanel.Content>
          <ResizablePanel.Content value="success">
            <Success onClose={onClose} />
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </DialogContent>
    </Dialog>
  );
}
