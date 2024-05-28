'use client';
import Button from '@/components/Common/Button';
import { FC, memo, useRef } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonSubmitStateType } from '../../../type';
import { ConnectButton } from './ConnectButton';
import { HACKATHON_SUBMIT_STEPS } from '../../constants';
import { useRequest } from 'ahooks';
import message from 'antd/es/message';
import webApi from '@/service';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import DisconnectModal, { DisconnectModalRef } from './DisconnectModal';

const ConnectWallet: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> &
    Pick<HackathonSubmitStateType, 'wallet' | 'status' | 'isSubmit'>
> = ({ onNext, onBack, wallet, projectId, status, refreshProjectInfo, isSubmit }) => {
  const disconnectModalRef = useRef<DisconnectModalRef>(null);

  const { run: onSubmit, loading } = useRequest(
    async () => {
      const newStatus =
        HACKATHON_SUBMIT_STEPS.find((item) => item.type === status)!.stepNumber === 4
          ? ProjectSubmitStepType.REVIEW
          : status;

      const formData = new FormData();
      formData.append('status', newStatus);
      await webApi.resourceStationApi.submitProject(formData, projectId);
      await refreshProjectInfo();
    },
    {
      manual: true,
      onSuccess() {
        onNext({});
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { runAsync: disconnect, loading: disConnectLoading } = useRequest(
    async () => {
      const formData = new FormData();
      formData.append('wallet', '');
      formData.append('status', ProjectSubmitStepType.WALLET);
      await webApi.resourceStationApi.submitProject(formData, projectId);
      await refreshProjectInfo();
    },
    {
      manual: true,
      onSuccess() {
        message.success(`Disconnect the wallet successfully`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const onDisconnect = () => {
    disconnectModalRef.current?.open({
      onConfirm: disconnect
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="body-m text-left text-neutral-rich-gray">Please connect a walletPlease</p>
        {/* <div className="flex justify-center gap-2 rounded-[16px] border border-dashed border-neutral-light-gray p-5 text-neutral-medium-gray">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 12.5C2 6.97715 6.47715 2.5 12 2.5C14.6522 2.5 17.1957 3.55357 19.0711 5.42893C20.9464 7.3043 22 9.84784 22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5ZM13 13.5H17C17.5523 13.5 18 13.0523 18 12.5C18 11.9477 17.5523 11.5 17 11.5H13V7.5C13 6.94772 12.5523 6.5 12 6.5C11.4477 6.5 11 6.94772 11 7.5V11.5H7C6.44772 11.5 6 11.9477 6 12.5C6 13.0523 6.44772 13.5 7 13.5H11V17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5V13.5Z"
              fill="#8C8C8C"
            />
          </svg>
          <span>Connect A New Wallet</span>
        </div> */}
        <ConnectButton
          wallet={wallet}
          projectId={projectId}
          status={status!}
          refreshProjectInfo={refreshProjectInfo}
          onDisconnect={onDisconnect}
        />
        <div className="flex items-center gap-1 rounded-[16px] bg-neutral-off-white p-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.9987 14.6693C4.3168 14.6693 1.33203 11.6845 1.33203 8.0026C1.33203 4.32071 4.3168 1.33594 7.9987 1.33594C9.76681 1.33594 11.4625 2.03832 12.7127 3.28856C13.963 4.5388 14.6654 6.23449 14.6654 8.0026C14.6654 11.6845 11.6806 14.6693 7.9987 14.6693ZM8.66536 8.6696V4.6696C8.66536 4.30141 8.36689 4.00293 7.9987 4.00293C7.63051 4.00293 7.33203 4.30141 7.33203 4.6696V8.6696C7.33203 9.03779 7.63051 9.33626 7.9987 9.33626C8.36689 9.33626 8.66536 9.03779 8.66536 8.6696ZM8.25204 10.7229C8.29453 10.7375 8.33488 10.7577 8.37204 10.7829C8.40697 10.8075 8.44036 10.8342 8.47204 10.8629C8.59386 10.9907 8.66292 11.1597 8.66538 11.3362C8.6664 11.5134 8.59683 11.6838 8.47204 11.8096C8.40724 11.8685 8.33283 11.9158 8.25204 11.9496C8.09068 12.0209 7.90674 12.0209 7.74538 11.9496C7.66459 11.9158 7.59018 11.8685 7.52538 11.8096C7.40058 11.6838 7.33102 11.5134 7.33204 11.3362C7.33102 11.159 7.40058 10.9887 7.52538 10.8629C7.68298 10.7068 7.90789 10.6394 8.12538 10.6829C8.16953 10.6891 8.21234 10.7026 8.25204 10.7229ZM7.99837 2.66895C10.9439 2.66895 13.3317 5.05676 13.3317 8.00228C13.3317 9.41677 12.7698 10.7733 11.7696 11.7735C10.7694 12.7737 9.41286 13.3356 7.99837 13.3356C5.05285 13.3356 2.66504 10.9478 2.66504 8.00228C2.66504 5.05676 5.05285 2.66895 7.99837 2.66895Z"
              fill="#8C8C8C"
            />
          </svg>
          <p className="body-s leading-[160%] text-neutral-medium-gray">
            You can only claim the reward by a wallet that uses the same network of the hackathon.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
          Back
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          className={cn('button-text-m w-[165px] px-0 py-4 uppercase', !wallet ? 'bg-neutral-light-gray' : '')}
          onClick={onSubmit}
          disabled={!wallet}
          loading={loading}
        >
          {isSubmit ? 'update' : 'Save'} and Next
        </Button>
      </div>

      <DisconnectModal ref={disconnectModalRef} />
    </div>
  );
};

export default memo(ConnectWallet);
