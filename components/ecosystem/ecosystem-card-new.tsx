import Image from 'next/image';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
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
      <div
        className={cn(
          'sm:card-hover group relative flex h-[251px] w-full flex-col gap-8 overflow-hidden rounded-2xl bg-neutral-white p-6 hover:bg-yellow-hover sm:border sm:border-neutral-light-gray sm:bg-transparent hover:sm:border-transparent',
          className
        )}
      >
        <div className="relative h-12 w-12 shrink-0 transition-all duration-300 group-hover:opacity-0">
          <Image src={ecosystem.image} alt={ecosystem.name} fill />
        </div>
        <div className="flex flex-col gap-4 transition-all duration-300 group-hover:-translate-y-20">
          <h2 className="font-bold capitalize text-neutral-black">{ecosystem.name}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{ecosystem.language}</Badge>
            {/* <Badge>
              {ecosystem.projectCount ?? 0} {ecosystem.projectCount === 1 ? 'project' : 'projects'}
            </Badge> */}
          </div>
          <p className="line-clamp-2 text-xs text-neutral-medium-gray group-hover:line-clamp-4">
            {ecosystem.description}
          </p>
        </div>
        <GoArrowRight
          size={24}
          className="absolute bottom-6 left-6 text-neutral-black opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}
