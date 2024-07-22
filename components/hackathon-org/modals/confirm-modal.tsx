'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function ConfirmModal({
  open,
  onConfirm,
  onClose,
  isLoading = false,
  children,
  autoClose = true
}: {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  autoClose?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-9 px-5 py-10 shadow-modal sm:w-[532px] sm:max-w-[532px]">
        <h2 className="headline-h4 break-all text-center text-neutral-black">{children}</h2>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            isLoading={isLoading}
            onClick={() => {
              onConfirm();
              autoClose && onClose();
            }}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
