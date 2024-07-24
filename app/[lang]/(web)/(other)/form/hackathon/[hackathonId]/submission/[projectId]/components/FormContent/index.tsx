'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS, getHackathonSubmissionSteps } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { ProjectSubmitStateType } from '../../type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { isUuid } from '@/helper/utils';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { ProjectType, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { HackathonRendererProvider } from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';

interface HackathonSubmitPageProps {
  simpleHackathonInfo: SimpleHackathonInfo;
  projectId: string | undefined;
  tracks: string[];
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = ({ simpleHackathonInfo, projectId, tracks }) => {
  const [current, setCurrent] = useState(-1);

  const hackathonSteps = getHackathonSubmissionSteps(simpleHackathonInfo.info.submission);

  const [formState, setFormState] = useState<ProjectSubmitStateType>({
    projectId: projectId || '',
    BasicInfo: {},
    Videos: {},
    ProjectDetail: {},
    Additions: {},
    status: hackathonSteps[0].type,
    isSubmit: false
  });

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const onNext = (state?: Partial<ProjectSubmitStateType>) => {
    setFormState({ ...formState, ...state });
    if (current < HACKATHON_SUBMIT_STEPS.length - 1) setCurrent(current + 1);
  };

  const onBack = () => {
    setCurrent(current - 1);
  };

  const setCurrentStep = (step: number) => {
    setCurrent(step);
  };

  const init = (projectInfo: ProjectType) => {
    const {
      id,
      name,
      hackathonId,
      submitType,
      prizeTrack,
      tracks,
      location,
      status,
      wallet,
      logo,
      fields,
      isSubmit,
      pitchVideo,
      demoVideo,
      detail,
      addition
    } = projectInfo!;

    const currentStep = hackathonSteps.find((step) => step.type === status)!;
    setCurrent(currentStep.stepNumber);

    const BasicInfo = {
      logo,
      name,
      location,
      prizeTrack,
      tracks,
      wallet,
      fields
    };

    const Videos = {
      pitchVideo: pitchVideo || undefined,
      demoVideo: demoVideo || undefined
    };

    setFormState({
      ...formState,
      BasicInfo,
      Videos,
      ProjectDetail: detail || {},
      Additions: addition || {},
      status,
      projectId: id,
      isSubmit
    });
  };

  const { run, refreshAsync: refreshProjectInfo } = useRequest(
    async () => {
      return webApi.resourceStationApi.getProjectsDetail(formState.projectId!);
    },
    {
      manual: true,
      onSuccess(res) {
        if (res.status) {
          init(res);
        } else setCurrent(0);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { redirectToUrl } = useRedirect();

  // const { runAsync: editRequest } = useRequest(
  //   () => {
  //     const status = hackathonSteps.find((item) => item.stepNumber === current)!.type;

  //     return webApi.resourceStationApi.submitProject(
  //       formData,
  //       isUuid(formState.projectId) ? formState.projectId : undefined
  //     );
  //   },
  //   {
  //     manual: true,
  //     onSuccess() {
  //       redirectToUrl(`/hackathon/${simpleHackathonInfo.alias}`);
  //     },
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  // const exit = useCallback(() => {
  //   exitConfirmRef.current?.open({
  //     onConfirm: editRequest
  //   });
  // }, [simpleHackathonInfo, redirectToUrl, editRequest, redirectToUrl]);

  useEffect(() => {
    if (formState.projectId && isUuid(formState.projectId)) run();
    else setCurrent(0);
  }, [formState.projectId]);

  // useEffect(() => {
  //   if (current <= 0) return;
  //   emitter.on('submit-form-exit', exit);
  //   return () => {
  //     emitter.off('submit-form-exit', exit);
  //   };
  // }, [exit]);

  return (
    <HackathonRendererProvider
      simpleHackathonInfo={simpleHackathonInfo}
      hackathonSteps={hackathonSteps}
      onNext={onNext}
      onBack={onBack}
      prizeTracks={tracks}
    >
      <div className="flex w-full flex-col justify-center gap-6 text-center">
        <FormHeader
          steps={hackathonSteps}
          current={current}
          description="Hackathon Submission"
          title={simpleHackathonInfo?.name || ''}
        />
        {current < 0 && (
          <div className="flex h-[200px] min-h-[200px] w-full items-center justify-center">
            <LoadingIcon width={64} height={64} />
          </div>
        )}
        {current > -1 && (
          <FormComponent
            projectId={formState.projectId}
            type={hackathonSteps[current].type}
            hackathonInfo={simpleHackathonInfo}
            refreshProjectInfo={refreshProjectInfo}
            setCurrentStep={setCurrentStep}
            formState={formState}
            isSubmit={formState.isSubmit}
          />
        )}
        <ConfirmModal ref={exitConfirmRef} confirmText={'Save & leave'}>
          <h4 className="text-h4 text-center text-neutral-black">
            Do you want to save the submission process & leave?
          </h4>
        </ConfirmModal>
      </div>
    </HackathonRendererProvider>
  );
};

export default HackathonSubmitPage;
