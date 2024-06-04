'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useSubmitModal } from './store';
import { SubmitBase } from './base';

export function SubmitMobilePortal() {
  const { open } = useSubmitModal();

  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  return open
    ? createPortal(
        <div className="fixed inset-x-0 top-16 z-[100] h-[calc(100vh-4rem)]">
          <div className="relative flex h-full w-full flex-col bg-neutral-white px-5 py-10">
            <SubmitBase />
          </div>
        </div>,
        document.body
      )
    : null;
}
