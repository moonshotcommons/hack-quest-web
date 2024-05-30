import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/helper/utils';
import { EcosystemType } from '@/service/webApi/ecosystem/type';

export function EcosystemCard({
  href,
  ecosystem,
  className
}: {
  href: string;
  ecosystem: EcosystemType;
  className?: string;
}) {
  return (
    <Link href={href}>
      <div className={cn('flex w-full items-center justify-between gap-4 rounded-2xl bg-neutral-white p-4', className)}>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold capitalize text-neutral-black">{ecosystem.name}</h2>
          <p className="line-clamp-2 text-xs text-neutral-medium-gray">{ecosystem.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{ecosystem.language}</Badge>
            <Badge>{ecosystem.track}</Badge>
          </div>
        </div>
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image src={ecosystem.image} alt={ecosystem.name} fill />
        </div>
      </div>
    </Link>
  );
}
