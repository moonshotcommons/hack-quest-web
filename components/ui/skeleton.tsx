import { cn } from '@/helper/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-2xl bg-neutral-off-white', className)} {...props} />;
}

export { Skeleton };
