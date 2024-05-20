import { Badge } from '@/components/ui/badge';

export function EcosystemCard() {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-neutral-white p-4">
      <div className="flex flex-1 flex-col justify-between gap-3">
        <h1 className="text-base font-bold text-neutral-black sm:text-lg">Build on Ethereum</h1>
        <p className="text-xs text-neutral-medium-gray">
          Solana is the fastest Layer1 blockchain using Proof of History
        </p>
        <div className="flex items-center gap-2">
          <Badge>Rust</Badge>
        </div>
      </div>
      <div className="relative flex h-10 w-10 items-center justify-center"></div>
    </div>
  );
}
