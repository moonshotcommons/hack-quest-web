'use client';

import { useRouter } from 'next-nprogress-bar';
import { ArrowIcon } from '@/components/ui/icons/arrow';

export function Back() {
  const router = useRouter();
  return (
    <button className="outline-none" aria-label="Back" onClick={() => router.back()}>
      <ArrowIcon aria-hidden className="h-8 w-8 text-neutral-rich-gray" />
    </button>
  );
}
