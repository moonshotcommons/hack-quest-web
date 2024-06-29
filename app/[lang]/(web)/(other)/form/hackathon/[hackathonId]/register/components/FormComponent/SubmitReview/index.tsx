import { FC, useRef, useState } from 'react';
import { CommonFormComponentProps } from '..';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import message from 'antd/es/message';
import { useRedirect } from '@/hooks/router/useRedirect';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import MenuLink from '@/constants/MenuLink';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HackathonPartner } from '../../../../submission/[projectId]/components/constants';
import { useHackathonConfig } from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import {
  ApplicationSectionType,
  CustomComponentConfig,
  PresetComponentConfig
} from '@/components/HackathonCreation/type';
interface SubmitReviewProps {
  setCurrentStep: (step: number) => void;
  sectionConfig: SimpleHackathonInfo['info']['application'];
}

const SubmitReview: FC<SubmitReviewProps & CommonFormComponentProps> = ({
  setCurrentStep,
  info,
  sectionConfig,
  isRegister
}) => {
  const gotoStep = (step: number) => {
    setCurrentStep(step);
  };

  const { simpleHackathonInfo, onBack } = useHackathonConfig();
  const hackathonInfo = simpleHackathonInfo!;
  const { about, onlineProfiles, applicationType } = info;
  const confirmModalRef = useRef<ConfirmModalRef>(null);
  const [allowContract, setAllowContract] = useState(true);
  const { runAsync, loading } = useRequest(
    () => {
      return webApi.resourceStationApi.registerHackathon(hackathonInfo.id, {
        allowContract: allowContract
      });
    },
    {
      manual: true,
      onSuccess() {
        !isRegister && message.success(`Register ${hackathonInfo.name} success!`);
        isRegister && message.success(`Update register info success!`);
        router.refresh();
        setTimeout(() => {
          redirectToUrl(MenuLink.HACKATHON_DASHBOARD);
        }, 300);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const router = useRouter();
  const { redirectToUrl } = useRedirect();

  const register = () => {
    confirmModalRef.current?.open({
      onConfirm: runAsync
    });
  };

  // const register = useCallback(
  //   async ({ resolve, reject }: any) => {
  //     try {
  //       if (formState.status === HackathonRegisterStep.Review) {
  //         await
  //         resolve('');
  //       } else {
  //         reject('Please complete all registration information before saving!');
  //       }
  //     } catch (err: any) {
  //       reject(err.msg || err.message);
  //     }
  //   },
  //   [simpleHackathonInfo, formState.status]
  // );

  return (
    <div>
      <div className="">
        <p className="body-l text-left text-neutral-off-black">
          Please check all information before you submit the registration
        </p>
        <div className="mt-4 flex flex-col gap-6">
          {/* {NameBlock}
          {ContractInfoBlock}
          {BioBlock}
          {TeamBlock} */}
          {Object.keys(sectionConfig).map((key) => {
            if (key === ApplicationSectionType.ApplicationType) return null;
            const section = sectionConfig[key as ApplicationSectionType] as (
              | PresetComponentConfig
              | CustomComponentConfig
            )[];
            return (
              <div key={key}>
                {
                  <div>
                    {section.map((cfg) => {
                      return <div>{cfg.id}</div>;
                    })}
                  </div>
                }
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack} htmlType="button">
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={cn(
            'button-text-m w-[165px] px-0 py-4 uppercase'
            //  disabled ? 'bg-neutral-light-gray' : ''
          )}
          // disabled={disabled}
          loading={loading}
          onClick={register}
        >
          {isRegister ? 'update' : 'register'}
        </Button>
      </div>
      <ConfirmModal ref={confirmModalRef}>
        {(isRegister || hackathonInfo.id !== HackathonPartner.Linea) && (
          <h4 className="text-h4 mb-9 text-center text-neutral-black">
            Do you want to {isRegister ? 'update' : 'register'} this hackathon?
          </h4>
        )}
        {!isRegister && hackathonInfo.id === HackathonPartner.Linea && (
          <>
            <p className="body-s text-center">
              Consensys may use the contact information you provide to us to contact you about our products and
              services. By ticking the checkbox, you consent to receive such communications. You may unsubscribe from
              these communications at any time. For information on how to unsubscribe, as well as our privacy practices
              and commitment to protecting your privacy, please review our Privacy Policy.{' '}
              <Link href={'https://consensys.io/privacy-notice'} target="_blank">
                https://consensys.io/privacy-notice
              </Link>
            </p>
            {/* <div className="mt-6 flex justify-center gap-2 text-neutral-rich-gray">
              <span
                className="body-s flex h-[22px] w-[22px] items-center justify-center rounded-[2px] border-[2px] border-neutral-black text-neutral-black"
                onClick={() => {
                  setConsent(!consent);
                }}
              >
                <span
                  className={cn(
                    'inline-block h-[14px] w-[14px] rounded-[2px] bg-neutral-black',
                    consent ? 'inline-block' : 'hidden'
                  )}
                ></span>
              </span>
              <span>Yes, I consent.</span>
            </div> */}
            <div className="mt-6 flex w-full justify-between gap-5 px-10">
              <div
                onClick={() => {
                  setAllowContract(true);
                }}
                className={cn(
                  `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
                  allowContract === true
                    ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
                    : ''
                )}
              >
                <span>Yes</span>
              </div>
              <div
                onClick={() => {
                  setAllowContract(false);
                }}
                className={cn(
                  `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
                  allowContract === false
                    ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
                    : ''
                )}
              >
                <span>No</span>
              </div>
            </div>
          </>
        )}
      </ConfirmModal>
    </div>
  );
};

const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.1671 8.44032L5.83375 14.4403C5.59058 14.7161 5.17001 14.743 4.89375 14.5003C4.61795 14.2572 4.5911 13.8366 4.83375 13.5603L9.77375 8.00032L4.83375 2.44032C4.60988 2.16238 4.64461 1.75743 4.91253 1.52166C5.18045 1.28589 5.58653 1.30293 5.83375 1.56032L11.1671 7.56032C11.3882 7.81199 11.3882 8.18865 11.1671 8.44032Z"
      fill="#131313"
    />
  </svg>
);

export default SubmitReview;
