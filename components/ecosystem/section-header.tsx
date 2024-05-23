import Image from 'next/image';
import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SectionHeader({
  title,
  tag,
  points,
  completed = false
}: {
  title: string;
  tag: string;
  points: number;
  completed?: boolean;
}) {
  return (
    <span className="flex items-center gap-6">
      <span className="relative hidden h-12 w-12 items-center justify-center rounded-[0.5rem] bg-yellow-light sm:flex">
        <Image src="/images/ecosystem/diamond.svg" alt="diamond" width={32} height={32} />
        {completed && (
          <span className="absolute -right-3 -top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-success text-neutral-white">
            <CheckIcon size={16} />
          </span>
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-left text-base font-bold text-neutral-black sm:text-lg">{title}</span>
        <span className="flex items-center gap-2">
          <Badge>{tag}</Badge>
          <span className="text-sm text-neutral-medium-gray sm:text-base">+{points} Points</span>
        </span>
      </span>
    </span>
  );
}
