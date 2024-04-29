'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonSubmitStateType } from '../../type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { isUuid } from '@/helper/utils';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import emitter from '@/store/emitter';
import { errorMessage } from '@/helper/ui';
import { ProjectSubmitStepType, ProjectType } from '@/service/webApi/resourceStation/type';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';

interface HackathonSubmitPageProps {
  simpleHackathonInfo: { id: string; name: string; alias: string };
  projectId: string | undefined;
  tracks: string[];
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = ({ simpleHackathonInfo, projectId, tracks }) => {
  const [current, setCurrent] = useState(-1);
  const [formState, setFormState] = useState<HackathonSubmitStateType>({
    projectId: projectId || '',
    info: {
      projectLogo: '',
      projectName: '',
      track: '',
      intro: '',
      detailedIntro: ''
    },
    pitchVideo: '',
    projectDemo: '',
    others: {
      githubLink: '',
      isPublic: undefined
    },
    status: ProjectSubmitStepType.INFO,
    wallet: '',
    isSubmit: false
  });

  const exitConfirmRef = useRef<ConfirmModalRef>(null);

  const onNext = (state: Partial<HackathonSubmitStateType>) => {
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
      description,
      video,
      introduction,
      demo,
      hackathonId,
      prizeTrack,
      tracks,
      status,
      thumbnail,
      wallet
    } = projectInfo!;
    const currentStep = HACKATHON_SUBMIT_STEPS.find((step) => step.type === status)!;
    setCurrent(currentStep.stepNumber);

    const info = {
      projectLogo: thumbnail,
      projectName: name,
      track: prizeTrack,
      intro: introduction,
      detailedIntro: description
    };

    setFormState({
      ...formState,
      info,
      status,
      projectId: id,
      pitchVideo: video,
      projectDemo: demo,
      wallet
    });
  };

  const { run, refreshAsync: refreshProjectInfo } = useRequest(
    async () => {
      return webApi.resourceStationApi.getProjectsDetail(formState.projectId!);
    },
    {
      manual: true,
      onSuccess(res) {
        if (res.status) init(res);
        else setCurrent(0);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { redirectToUrl } = useRedirect();

  const { runAsync: editRequest } = useRequest(
    () => {
      const status = HACKATHON_SUBMIT_STEPS.find((item) => item.stepNumber === current)!.type;
      const formData = new FormData();
      formData.append('name', formState.info.projectName);
      formData.append('hackathonId', simpleHackathonInfo.id);
      formData.append('prizeTrack', formState.info.track);
      formData.append('introduction', formState.info.intro);
      formData.append('description', formState.info.detailedIntro);
      formData.append('githubLink', formState.others.githubLink);
      formData.append('isOpenSource', String(formState.others.isPublic));
      formData.append('status', status);

      return webApi.resourceStationApi.submitProject(
        formData,
        isUuid(formState.projectId) ? undefined : formState.projectId
      );
    },
    {
      manual: true,
      onSuccess() {
        redirectToUrl(`/hackathon/${simpleHackathonInfo.alias}`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const exit = useCallback(() => {
    exitConfirmRef.current?.open({
      onConfirm: editRequest
    });
  }, [simpleHackathonInfo, redirectToUrl, editRequest, redirectToUrl]);

  useEffect(() => {
    emitter.on('submit-form-exit', exit);
    return () => {
      emitter.off('submit-form-exit', exit);
    };
  }, [exit]);

  useEffect(() => {
    if (formState.projectId && isUuid(formState.projectId)) run();
    else setCurrent(0);
  }, [formState.projectId]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 text-center">
      <FormHeader
        steps={HACKATHON_SUBMIT_STEPS}
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
          type={HACKATHON_SUBMIT_STEPS[current].type}
          simpleHackathonInfo={simpleHackathonInfo}
          onNext={onNext}
          onBack={onBack}
          tracks={tracks}
          refreshProjectInfo={refreshProjectInfo}
          projectId={formState.projectId}
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

export default HackathonSubmitPage;
