import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export function ExploreCard({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href}>
      <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-light-gray text-neutral-medium-gray">
        <PlusIcon size={32} />
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>
    </Link>
  );
}
