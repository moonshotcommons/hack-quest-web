'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonRegisterStateType } from '../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import {
  HackathonRegisterInfo,
  HackathonRegisterStep,
  HackathonTeamDetail
} from '@/service/webApi/resourceStation/type';
import LoadingIcon from '@/components/Common/LoadingIcon';
import emitter from '@/store/emitter';
import { useRedirect } from '@/hooks/router/useRedirect';

interface FormContentProps {
  simpleHackathonInfo: { id: string; name: string; alias: string };
}

const FormContent: FC<FormContentProps> = ({ simpleHackathonInfo }) => {
  const [current, setCurrent] = useState(-1);
  const [formState, setFormState] = useState<HackathonRegisterStateType>({
    name: {
      firstName: '',
      lastName: ''
    },
    contractInfo: {
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
    status: HackathonRegisterStep.Name
  });

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

  const init = (registerInfo: HackathonRegisterInfo, teamDetail: HackathonTeamDetail | {}) => {
    const { firstName, lastName, bio, status, weChat, team, userId, telegram, avatar } = registerInfo;

    const currentStep = HACKATHON_SUBMIT_STEPS.find((step) => step.type === status)!;

    setCurrent(currentStep.stepNumber);
    const name = { firstName: firstName || '', lastName: lastName || '' };
    const contractInfo = { weChat: weChat || '', telegram: telegram || '' };

    const isSoloRegister = status === HackathonRegisterStep.Review && !Object.keys(team || {}).length;
    const isNullType = status === HackathonRegisterStep.SubmissionType && !Object.keys(team || {}).length;

    setFormState({
      ...formState,
      status: status,
      name,
      bio: bio || '',
      contractInfo,
      submissionType: {
        type: isNullType ? null : isSoloRegister ? 'Solo Project' : 'Group Project',
        groupType:
          !!Object.keys(team || {}).length && team.creatorId === userId
            ? 'owner'
            : !!Object.keys(team || {}).length
              ? 'member'
              : undefined,
        team: team || {},
        teamDetail: teamDetail || {},
        userId: userId || '',
        avatar: avatar || ''
      }
    });
  };

  const { run, refreshAsync: refreshRegisterInfo } = useRequest(
    async () => {
      const registerInfo = await webApi.resourceStationApi.getHackathonRegisterInfo(simpleHackathonInfo.id);
      let teamDetail = {};
      if (!!Object.keys(registerInfo.team || {}).length) {
        teamDetail = await webApi.resourceStationApi.getHackathonTeamDetail(registerInfo.team.code!);
      }
      return { registerInfo, teamDetail };
    },
    {
      manual: true,
      onSuccess({ registerInfo, teamDetail }) {
        if (registerInfo.status) init(registerInfo, teamDetail);
        else setCurrent(0);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const register = useCallback(
    async ({ resolve, reject }: any) => {
      try {
        if (formState.status === HackathonRegisterStep.Review) {
          await webApi.resourceStationApi.registerHackathon(simpleHackathonInfo.id);
          resolve('');
        } else {
          reject('Please complete all registration information before saving!');
        }
      } catch (err: any) {
        reject(err.msg || err.message);
      }
    },
    [simpleHackathonInfo, formState.status]
  );

  const { redirectToUrl } = useRedirect();

  const edit = useCallback(() => {
    redirectToUrl(`/hackathon/${simpleHackathonInfo.alias}`);
  }, [simpleHackathonInfo, redirectToUrl]);

  useEffect(() => {
    run();
    emitter.on('submit-form-save', register);
    emitter.on('submit-form-exit', edit);
    return () => {
      emitter.off('submit-form-save', register);
      emitter.off('submit-form-exit', edit);
    };
  }, [register, edit]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 text-center">
      <FormHeader
        steps={HACKATHON_SUBMIT_STEPS}
        current={current}
        description="Hackathon Registration"
        title={simpleHackathonInfo?.name || ''}
      />
      {current < 0 && (
        <div className="flex h-[200px] min-h-[200px] w-full items-center justify-center">
          <LoadingIcon width={64} height={64} />
        </div>
      )}
      {current > -1 && (
        <FormComponent
          type={HACKATHON_SUBMIT_STEPS[current].type}
          simpleHackathonInfo={simpleHackathonInfo}
          onNext={onNext}
          onBack={onBack}
          refreshRegisterInfo={refreshRegisterInfo}
          setCurrentStep={setCurrentStep}
          formState={formState}
        />
      )}
    </div>
  );
};

export default FormContent;
