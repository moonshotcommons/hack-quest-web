import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export function EcosystemCard({
  name,
  description,
  href,
  tags
}: {
  name: string;
  description: string;
  href: string;
  tags: string[];
}) {
  return (
    <Link href={href}>
      <div className="flex w-full items-center justify-between rounded-2xl bg-neutral-white p-4">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold capitalize text-neutral-black">Certified {name} Developer</h2>
          <p className="text-xs text-neutral-medium-gray">{description}</p>
          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="relative h-12 w-12">
          <Image src={`/images/ecosystem/${name}-logo.svg`} alt={name} fill />
        </div>
      </div>
    </Link>
  );
}
