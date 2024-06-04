import { MantleContext } from '@/app/[lang]/(web)/(base page)/(reward)/campaigns/constants/type';
import Button from '@/components/Common/Button';
import { errorMessage } from '@/helper/ui';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import { FC, useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface NotCertifiedProps {
  onClose: VoidFunction;
  completed?: boolean;
  campaignId?: string;
}

const NotCertified: FC<NotCertifiedProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
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
      <h3 className="text-h3 text-neutral-off-black">{t('becomeCertifiedDeveloper')}</h3>
      <p className="body-m mt-[20px] text-neutral-black">{t('youStepAwayFromDevelopers')}</p>
      <div className="mt-[40px] flex gap-x-[10px]">
        <Button
          type="primary"
          disabled={!completed || loading}
          loading={loading}
          className={cn(
            'body-m w-[210px] px-0 py-[11px]  uppercase text-neutral-black',
            !completed ? 'opacity-40' : ''
          )}
          onClick={() => {
            if (campaignId) run(campaignId);
          }}
        >
          {t('claim')}
        </Button>
        <Button
          ghost
          className="body-m w-[210px] border-neutral-black px-0  py-[11px] uppercase text-neutral-black"
          onClick={() => onClose()}
        >
          {t('close')}
        </Button>
      </div>
    </div>
  );
};

export default NotCertified;
