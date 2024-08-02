import { cn } from '@/helper/utils';

export function Steps({ currentStep, totalStep = 3 }: { currentStep: number; totalStep?: number }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      {[...Array(totalStep)].map((_, index) => (
        <span
          key={index}
          className={cn('h-1.5 w-10 rounded-[0.5rem] bg-neutral-light-gray', {
            'bg-yellow-dark': index + 1 <= currentStep
          })}
        />
      ))}
    </div>
  );
}
