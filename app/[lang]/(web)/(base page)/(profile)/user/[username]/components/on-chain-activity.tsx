import { Button } from '@/components/ui/button';

export function OnChainActivity() {
  return (
    <div className="rounded-2xl border border-neutral-light-gray p-6">
      <h2 className="font-next-book-bold text-[22px] font-bold text-neutral-off-black">On-Chain Activity</h2>
      <Button className="mt-6 inline-flex w-[140px] gap-3" variant="outline" size="small">
        connect
      </Button>
    </div>
  );
}
