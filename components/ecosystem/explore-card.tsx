import { cn } from '@/helper/utils';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export function ExploreCard({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'flex h-[21.875rem] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-light-gray text-neutral-medium-gray sm:h-[366px]',
          className
        )}
      >
        <PlusIcon size={32} />
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>
    </Link>
  );
}
