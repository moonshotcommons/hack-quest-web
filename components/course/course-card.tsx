import { BookOpenIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/helper/utils';

export function CourseCard({
  rootClassName,
  imageClassName,
  actionClassName
}: {
  rootClassName?: string;
  imageClassName?: string;
  actionClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white sm:flex-row sm:border-transparent',
        rootClassName
      )}
    >
      <div className={cn('relative h-40 w-full flex-shrink-0 sm:h-[16.875rem] sm:w-[30rem]', imageClassName)}></div>
      <div className="flex flex-1 flex-col px-4 py-5 sm:p-6">
        <Badge className="self-start">Basic</Badge>
        <h1 className="mt-4 text-base font-bold text-neutral-off-black sm:text-lg">Web 3 Onboarding</h1>
        <p className="mt-4 hidden text-sm text-neutral-medium-gray sm:block">
          Mantle Network, an Ethereum layer-2 (L2) solution, is one of the fastest-growing Ethereum infrastructures.
          Learn Solidity step by step from the basic syntax to advanced guided projects .
        </p>
        <div className={cn('mt-4 flex flex-col items-center gap-4 sm:mt-auto sm:flex-row sm:gap-6', actionClassName)}>
          <div className="flex w-full flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <BookOpenIcon size={20} />
              <span className="text-xs font-bold text-neutral-rich-gray">Next up</span>
              <span className="text-xs text-neutral-rich-gray">What is Solidity?</span>
            </div>
            <Progress value={33}>
              <ProgressLabel>33%</ProgressLabel>
            </Progress>
          </div>
          <Button type="primary" className="w-full uppercase sm:w-[18.375rem]">
            continue
          </Button>
        </div>
      </div>
    </div>
  );
}
