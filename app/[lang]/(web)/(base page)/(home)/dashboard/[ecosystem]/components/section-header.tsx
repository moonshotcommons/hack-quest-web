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
      <span className="relative flex h-12 w-12 items-center justify-center rounded-[0.5rem] bg-yellow-light">
        <Image src="/images/ecosystem/diamond.svg" alt="diamond" width={32} height={32} />
        {completed && (
          <span className="absolute -right-3 -top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-success text-neutral-white">
            <CheckIcon size={16} />
          </span>
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-lg font-bold text-neutral-black">{title}</span>
        <span className="flex gap-2">
          <Badge>{tag}</Badge>
          <span className="text-neutral-medium-gray">+{points} Points</span>
        </span>
      </span>
    </span>
  );
}
