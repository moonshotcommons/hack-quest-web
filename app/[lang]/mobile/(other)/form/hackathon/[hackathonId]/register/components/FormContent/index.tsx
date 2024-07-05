'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getHackathonRegisterSteps } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonRegisterStateType } from '../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { HackathonRegisterInfo, HackathonTeamDetail, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { useRedirect } from '@/hooks/router/useRedirect';
import { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { HackathonRendererProvider } from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import useGetHeight from '@/hooks/dom/useGetHeight';

interface FormContentProps {
  simpleHackathonInfo: SimpleHackathonInfo;
}

const FormContent: FC<FormContentProps> = ({ simpleHackathonInfo }) => {
  const [current, setCurrent] = useState(-1);
  const exitConfirmRef = useRef<ConfirmModalRef>(null);
  const hackathonSteps = getHackathonRegisterSteps(simpleHackathonInfo.info.application);
  const [formState, setFormState] = useState<HackathonRegisterStateType>({
    info: {
      About: {},
      OnlineProfiles: {},
      Contact: {},
      ApplicationType: {
        type: null,
        groupType: undefined,
        team: {},
        userId: '',
        teamDetail: {},
        avatar: ''
      }
    },
    status: hackathonSteps[0].type,
    isRegister: false
  });

  const onNext = (state?: Partial<HackathonRegisterStateType>) => {
    if (state) {
      const { info } = state;
      setFormState({ ...formState, ...state, info: { ...formState.info, ...info } });
    }
    if (current < hackathonSteps.length - 1) setCurrent(current + 1);
  };

  const onBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const init = (registerInfo: HackathonRegisterInfo, teamDetail: HackathonTeamDetail | {}) => {
    const { info, team, status, userId, avatar, isRegister } = registerInfo;

    const currentStep = hackathonSteps.find((step) => step.type === status)!;
    setCurrent(currentStep.stepNumber);

    const isSoloRegister = status === 'Review' && !Object.keys(team || {}).length;
    const isNullType = status === ApplicationSectionType.ApplicationType && !Object.keys(team || {}).length;

    setFormState({
      ...formState,
      status: status,
      info: {
        About: info.About! || {},
        OnlineProfiles: info.OnlineProfiles || {},
        Contact: info.Contact || {},
        ApplicationType: {
          type: isNullType ? null : isSoloRegister ? 'Solo Project' : 'Group Project',
          groupType:
            !!Object.keys(team || {}).length && team?.creatorId === userId
              ? 'owner'
              : !!Object.keys(team || {}).length
                ? 'member'
                : undefined,
          team: team || {},
          teamDetail: teamDetail || {},
          userId: userId || '',
          avatar: avatar || ''
        }
      },
      isRegister
    });
  };

  const { run, refreshAsync: refreshRegisterInfo } = useRequest(
    async () => {
      const registerInfo = await webApi.resourceStationApi.getHackathonRegisterInfo(simpleHackathonInfo.id);
      let teamDetail = {};
      if (!!Object.keys(registerInfo.team || {}).length) {
        teamDetail = await webApi.resourceStationApi.getHackathonTeamDetail(registerInfo.team?.code!);
      }
      return { registerInfo, teamDetail };
    },
    {
      manual: true,
      onSuccess({ registerInfo, teamDetail }) {
        if (registerInfo.status) {
          init(registerInfo, teamDetail);
        } else setCurrent(0);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { redirectToUrl } = useRedirect();

  const exitRequest = async () => {};

  const exit = useCallback(() => {
    exitConfirmRef.current?.open({
      onConfirm: exitRequest
    });
  }, [simpleHackathonInfo, redirectToUrl, exitRequest, redirectToUrl]);

  useEffect(() => {
    run();
  }, []);

  const setCurrentStep = (step: number) => {
    setCurrent(step);
  };
  const { pageHeight } = useGetHeight();

  return (
    <HackathonRendererProvider
      simpleHackathonInfo={simpleHackathonInfo}
      hackathonSteps={hackathonSteps}
      onNext={onNext}
      onBack={onBack}
      prizeTracks={[]}
    >
      <div
        className="max-w-screen mx-auto flex w-full flex-col bg-white px-5 pb-10 pt-5"
        style={{
          height: pageHeight
        }}
      >
        <div className="flex h-full w-full flex-col gap-6 text-center">
          <FormHeader
            steps={hackathonSteps}
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
              type={hackathonSteps[current].type}
              hackathonInfo={simpleHackathonInfo}
              refreshRegisterInfo={refreshRegisterInfo}
              setCurrentStep={setCurrent}
              formState={formState}
            />
          )}
        </div>
      </div>
    </HackathonRendererProvider>
  );
};

export default FormContent;
