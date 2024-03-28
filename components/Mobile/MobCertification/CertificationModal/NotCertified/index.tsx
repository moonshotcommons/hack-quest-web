import { MantleContext } from '@/app/[lang]/(web)/(base page)/(reward)/campaigns/constants/type';
import Button from '@/components/Common/Button';
import { errorMessage } from '@/helper/ui';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { FC, useContext } from 'react';

interface NotCertifiedProps {
  onClose: VoidFunction;
  completed?: boolean;
  campaignId?: string;
}

const NotCertified: FC<NotCertifiedProps> = (props) => {
  const { onClose, campaignId, completed = false } = props;

  const { refresh } = useContext(MantleContext);

  const { run, loading } = useRequest(
    async (campaignId: string) => {
      const res = await webApi.campaignsApi.campaignsClaim({ campaignId });
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('Claim success!');
        refresh?.();
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <div className="flex-1">
      <h3 className="text-h3 text-neutral-off-black">Become a Certified Developer</h3>
      <p className="body-m mt-[20px] text-neutral-black">
        You are just one step away from becoming a certified Web3 Developers. Complete the learning track and claim your NFT or SBT
        proof-of-completion certificate now to elevate your skills and demonstrate your expertise.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        <Button
          type="primary"
          block
          disabled={!completed || loading}
          loading={loading}
          className={cn('body-m px-0  py-[11px] text-neutral-black', !completed ? 'opacity-40' : '')}
          onClick={() => {
            if (campaignId) run(campaignId);
          }}
        >
          Claim
        </Button>
        <Button ghost block className="body-m border-neutral-black  px-0 py-[11px] text-neutral-black" onClick={() => onClose()}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default NotCertified;
