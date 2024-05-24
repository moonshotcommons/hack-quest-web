import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export function EcosystemCard({ title }: { title: string }) {
  return (
    <div className="card-hover flex items-center gap-4 rounded-2xl bg-neutral-white p-4">
      <div className="flex flex-1 flex-col justify-between gap-3">
        <h1 className="text-base font-bold capitalize text-neutral-black sm:text-lg">Build on {title}</h1>
        <p className="text-xs text-neutral-medium-gray">
          Solana is the fastest Layer1 blockchain using Proof of History
        </p>
        <div className="flex items-center gap-2">
          <Badge>Rust</Badge>
          <Badge>Certified Learning Track</Badge>
        </div>
      </div>
      <div className="relative flex h-12 w-12 items-center justify-center">
        <Image src={`/images/ecosystem/${title}.svg`} alt={title} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
}
