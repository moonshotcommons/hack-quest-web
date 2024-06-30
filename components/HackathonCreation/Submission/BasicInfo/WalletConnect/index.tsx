'use client';
import { FC, memo, useEffect, useRef } from 'react';
import { ConnectButton } from './ConnectButton';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import DisconnectModal, { DisconnectModalRef } from './DisconnectModal';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import emitter from '@/store/emitter';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { v4 } from 'uuid';
import { z } from 'zod';
import { FormInput } from '@/components/Common/FormComponent';
import Image from 'next/image';

export interface ConnectWalletProps {
  form: any;
  config: PresetComponentConfig;
}

export const ConnectWallet: FC<ConnectWalletProps> = memo(({ config, form }) => {
  const disconnectModalRef = useRef<DisconnectModalRef>(null);
  const { redirectToUrl } = useRedirect();

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const { run: onSubmit, loading } = useRequest(
    async () => {
      // const formData = new FormData();
      // formData.append('status', newStatus);
      // await webApi.resourceStationApi.submitProject(formData, projectId);
      // await refreshProjectInfo();
      // return { status: newStatus };
    },
    {
      manual: true,
      onSuccess() {},
      onError(err) {
        errorMessage(err);
      }
    }
  );

  // const { runAsync: disconnect, loading: disConnectLoading } = useRequest(
  //   async () => {
  //     const formData = new FormData();
  //     formData.append('wallet', '');
  //     formData.append('status', ProjectSubmitStepType.WALLET);
  //     // await webApi.resourceStationApi.submitProject(formData, projectId);
  //     // await refreshProjectInfo();
  //   },
  //   {
  //     manual: true,
  //     onSuccess() {
  //       message.success(`Disconnect the wallet successfully`);
  //     },
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  const onDisconnect = () => {
    disconnectModalRef.current?.open({
      onConfirm: () => {
        form.setValue('wallet', '');
        return Promise.resolve();
      }
    });
  };

  useEffect(() => {
    const exit = () => {
      exitConfirmRef.current?.open({
        onConfirm: async () => {},
        onConfirmCallback: () => redirectToUrl(`${MenuLink.HACKATHON_DASHBOARD}`)
      });
    };

    emitter.on('submit-form-exit', exit);
    return () => {
      emitter.off('submit-form-exit', exit);
    };
  }, []);

  const requiredTag = config.optional ? ' (Optional)' : '*';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="body-m text-left text-neutral-rich-gray">{'Please connect a walletPlease' + requiredTag}</p>
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
          form={form}

          // onDisconnect={onDisconnect}
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
      <FormInput name="wallet" form={form} label="" placeholder="" className="hidden" />
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the submission process & leave?</h4>
      </ConfirmModal>
      <DisconnectModal ref={disconnectModalRef} />
    </div>
  );
});

ConnectWallet.displayName = 'ConnectWallet';

export const ConnectWalletConfig: PresetComponentConfig<ConnectWalletProps> = {
  id: v4(),
  type: ConnectWallet.displayName,
  component: ConnectWallet,
  optional: false,
  property: {},
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Wallet Information</span>
        <p className="body-m flex gap-1 text-left text-neutral-off-black">
          <Image src={'/images/login/metamask.svg'} alt="wallet" width={26} height={26} />
          <span>{info.wallet.replace(/(.{15})(.*)(.{4})/, '$1...$3')}</span>
        </p>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      wallet: config.optional ? validator.optional() : validator
    };
  }
};

export default ConnectWalletConfig;
