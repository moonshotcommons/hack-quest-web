import { Button } from '@/components/ui/button';

export function OnChainActivity() {
  return (
    <div className="bg-neutral-white px-5 py-4 sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">On-Chain Activity</h2>
      <Button className="mt-4 inline-flex w-[140px] gap-3 sm:mt-6" variant="outline" size="small">
        connect
      </Button>
    </div>
  );
}
