import { Skeleton } from '@/components/ui/skeleton';

export function JobSkeleton() {
  return [...Array(3)].map((_, index) => (
    <Skeleton key={index} className="w-full rounded-2xl bg-neutral-white sm:h-[230px]" />
  ));
}
