import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export function ExploreCard({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href}>
      <div className="flex h-[21.875rem] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-light-gray text-neutral-medium-gray sm:h-[23.25rem]">
        <PlusIcon size={32} />
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>
    </Link>
  );
}
