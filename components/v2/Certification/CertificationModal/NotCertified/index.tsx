import { MantleContext } from '@/components/v2/Campaigns/Mantle/type';
import Button from '@/components/v2/Common/Button';
import { cn, errorMessage } from '@/helper/utils';
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
      const res = await webApi.campaigns.campaignsClaim({ campaignId });
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
      <h3 className="font-next-poster-Bold text-[28px] text-[#131313] tracking-[1.68px]">
        Become a Certified Mantle Developer!
      </h3>
      <p className="mt-[20px] font-next-book text-[16px] leading-[160%] tracking-[0.32px] text-[#0B0B0B]">
        You are just one step away from becoming the inaugural group of
        Certified Mantle Developers. Complete the learning track and claim your
        non-transferable SBT proof-of-completion certificate now to elevate your
        skills and demonstrate your expertise!
      </p>
      <div className="flex gap-x-[10px] mt-[40px]">
        <Button
          type="primary"
          disabled={!completed || loading}
          loading={loading}
          className={cn(
            'w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px]',
            !completed ? 'opacity-40' : ''
          )}
          onClick={() => {
            if (campaignId) run(campaignId);
          }}
        >
          Claim Certificate
        </Button>
        <Button
          ghost
          className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] border-[#0B0B0B]"
          onClick={() => onClose()}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default NotCertified;
