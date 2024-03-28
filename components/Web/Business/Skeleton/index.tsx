import { cn } from '@/helper/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse bg-gray-300', className)} {...props} />;
}

export default Skeleton;
