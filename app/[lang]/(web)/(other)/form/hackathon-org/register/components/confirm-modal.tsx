'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function ConfirmModal({
  open,
  onConfirm,
  onClose
}: {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[532px] max-w-[532px] gap-9 px-5 py-10 shadow-modal">
        <h2 className="headline-h4 text-center text-neutral-black">Do you want to remove this image?</h2>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" className="w-[165px]" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-[165px]"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
