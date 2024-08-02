import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useProfile } from './profile-provider';

export function OnChainActivity() {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { profile, invalidate } = useProfile();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!account?.isConnected && openConnectModal) {
        openConnectModal();
        return;
      }
      if (account) {
        const result = await webApi.userApi.linkChain(account?.address!);
        return result;
      }
    },
    onSuccess: () => {
      invalidate();
    }
  });

  return (
    <div className="self-start bg-neutral-white px-5 py-4 sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">On-Chain Activity</h2>
      {Object.keys(profile?.onChainActivity || {}).length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-8">
          <div className="flex flex-col gap-1">
            <span className="text-lg">{profile?.onChainActivity?.balance}</span>
            <span className="text-sm text-neutral-medium-gray">Deployed Contracts</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">{profile?.onChainActivity?.transactionCount}</span>
            <span className="text-sm text-neutral-medium-gray">Defi Interaction</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">{profile?.onChainActivity?.balance}</span>
            <span className="text-sm text-neutral-medium-gray">Total Contract Deployed</span>
          </div>
        </div>
      ) : (
        <Button
          className="mt-4 inline-flex w-[140px] gap-3 sm:mt-6"
          variant="outline"
          size="small"
          isLoading={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          connect
        </Button>
      )}
    </div>
  );
}