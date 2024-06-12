import { cn } from '@/helper/utils';

export function Flashing({ className, rootClassName }: { className?: string; rootClassName?: string }) {
  return (
    <div className={cn('flex items-center gap-1', rootClassName)}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <span
            className={cn(
              'h-1.5 w-1.5 animate-flashing rounded-full bg-neutral-black even:delay-200 first-of-type:delay-0 last-of-type:delay-300',
              className
            )}
            key={index}
          />
        ))}
    </div>
  );
}
