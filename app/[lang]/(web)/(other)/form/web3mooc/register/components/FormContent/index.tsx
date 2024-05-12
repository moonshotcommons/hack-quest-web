'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonRegisterStateType } from '../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';
import LoadingIcon from '@/components/Common/LoadingIcon';
import emitter from '@/store/emitter';
import { useRedirect } from '@/hooks/router/useRedirect';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { NtuRegisterInfo } from '@/service/webApi/course/type';

interface FormContentProps {}

const FormContent: FC<FormContentProps> = () => {
  const [current, setCurrent] = useState(-1);
  const [formState, setFormState] = useState<HackathonRegisterStateType>({
    name: {
      firstName: '',
      lastName: ''
    },
    contractInfo: {
      email: '',
      weChat: '',
      telegram: ''
    },
    bio: '',
    submissionType: {
      type: null,
      groupType: undefined,
      team: {},
      userId: '',
      teamDetail: {},
      avatar: ''
    },
    status: HackathonRegisterStep.Name,
    isRegister: false
  });

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const onNext = (state: Partial<HackathonRegisterStateType>) => {
    setFormState({ ...formState, ...state });
    if (current < HACKATHON_SUBMIT_STEPS.length - 1) setCurrent(current + 1);
  };

  const onBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const setCurrentStep = (step: number) => {
    setCurrent(step);
  };

  const init = (registerInfo: NtuRegisterInfo) => {
    const { firstName, lastName, bio, status, weChat, email, userId, telegram, avatar, isRegister } = registerInfo;

    const currentStep = HACKATHON_SUBMIT_STEPS.find((step) => step.type === status)!;

    setCurrent(currentStep.stepNumber);
    const name = { firstName: firstName || '', lastName: lastName || '' };
    const contractInfo = { weChat: weChat || '', telegram: telegram || '', email: email || '' };

    setFormState({
      ...formState,
      status: status,
      name,
      bio: bio || '',
      contractInfo,
      isRegister
    });
  };

  const { run, refreshAsync: refreshRegisterInfo } = useRequest(
    async () => {
      const registerInfo = await webApi.courseApi.getNtuRegisterInfo();
      return registerInfo;
    },
    {
      manual: true,
      onSuccess(registerInfo) {
        if (registerInfo.status) init(registerInfo);
        else setCurrent(0);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  // const register = useCallback(
  //   async ({ resolve, reject }: any) => {
  //     try {
  //       if (formState.status === HackathonRegisterStep.Review) {
  //         await webApi.resourceStationApi.registerHackathon(simpleHackathonInfo.id);
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

  const { redirectToUrl } = useRedirect();

  const { runAsync: exitRequest } = useRequest(
    () => {
      const status = HACKATHON_SUBMIT_STEPS.find((item) => item.stepNumber === current)!.type;

      return webApi.courseApi.updateNtuRegisterInfo({
        firstName: formState.name.firstName,
        lastName: formState.name.lastName,
        bio: formState.bio,
        email: formState.contractInfo.email,
        telegram: formState.contractInfo.weChat,
        weChat: formState.contractInfo.telegram,
        status
      });
    },
    {
      manual: true,
      onSuccess() {
        redirectToUrl(`/web3mooc`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const exit = useCallback(() => {
    exitConfirmRef.current?.open({
      onConfirm: exitRequest
    });
  }, [exitRequest]);

  useEffect(() => {
    run();
    // emitter.on('submit-form-save', register);
    emitter.on('submit-form-exit', exit);
    return () => {
      // emitter.off('submit-form-save', register);
      emitter.off('submit-form-exit', exit);
    };
  }, [exit]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 text-center">
      <FormHeader
        steps={HACKATHON_SUBMIT_STEPS}
        current={current}
        description="NTU Course Registration"
        title={'Ideating and Building in Web3 MOOC'}
      />
      {current < 0 && (
        <div className="flex h-[200px] min-h-[200px] w-full items-center justify-center">
          <LoadingIcon width={64} height={64} />
        </div>
      )}
      {current > -1 && (
        <FormComponent
          type={HACKATHON_SUBMIT_STEPS[current].type}
          onNext={onNext}
          onBack={onBack}
          refreshRegisterInfo={refreshRegisterInfo}
          setCurrentStep={setCurrentStep}
          formState={formState}
        />
      )}
      <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
        <h4 className="text-h4 text-center text-neutral-black">Do you want to save the submission process & leave?</h4>
      </ConfirmModal>
    </div>
  );
};

export default FormContent;
