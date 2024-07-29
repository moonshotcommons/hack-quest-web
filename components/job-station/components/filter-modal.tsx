'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { JobKeyword, JobLocation, JobType } from './job-filter';
import { useSearchParams } from 'next/navigation';

export function FilterModal() {
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());

  const count = currentParams.toString() ? currentParams.toString()?.split('&')?.length : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          {count > 0 ? (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-off-black text-neutral-white">
              {count}
            </span>
          ) : (
            <SlidersHorizontalIcon className="h-5 w-5" />
          )}
          <span className="ml-2 text-sm font-medium">Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-96 w-[92.5%] gap-5 overflow-auto rounded-xl p-8">
        <h3 className="font-bold">Job Type</h3>
        <JobType />
        <h3 className="font-bold">Job Location</h3>
        <JobLocation />
        <h3 className="font-bold">Keywords</h3>
        <JobKeyword />
      </DialogContent>
    </Dialog>
  );
}
