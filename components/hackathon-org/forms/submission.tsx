'use client';

import * as React from 'react';
import { ActionButtons } from './action-buttons';
import { BasicInfo } from './submission/basic-info';
import { ProjectDetail } from './submission/project-detail';
import { Additions } from './submission/additions';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { useSubmissionState } from './submission/state';
import { updateState } from '../constants/utils';

export function SubmissionForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave,
  refresh
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
  refresh?: () => void;
}) {
  const submission = initialValues?.info?.submission;
  const queryClient = useQueryClient();
  const {
    basicInfoState,
    projectDetailState,
    additionState,
    setBasicInfoState,
    setProjectDetailState,
    setAdditionState
  } = useSubmissionState();
  const { updateStatus, onStepChange } = useHackathonOrgState();

  const mutation = useMutation({
    mutationFn: (data: any) => webApi.hackathonV2Api.updateHackathon(data, 'submission'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      refresh?.();
      isEditMode ? onSave?.() : onStepChange(Steps.REWARDS);
    }
  });

  // React.useEffect(() => {
  //   if (!isEditMode) {
  //     updateStatus(Steps.SUBMISSION, true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isEditMode]);

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.APPLICATION);
  }

  function onSaveOrNext() {
    const videos = additionState.filter(
      (i) => i.id === '87dcabfb-ff92-4b3e-9fff-c34f5d3328b8' || i.id === 'b4428d08-8887-48aa-a366-165d4cb55451'
    );
    const data = {
      id: initialValues?.id,
      submission: {
        BasicInfo: basicInfoState.filter((i) => i.selected),
        ProjectDetail: projectDetailState.filter((i) => i.selected),
        Additions: additionState
          .filter((i) => i.selected)
          .filter(
            (i) => i.id !== '87dcabfb-ff92-4b3e-9fff-c34f5d3328b8' && i.id !== 'b4428d08-8887-48aa-a366-165d4cb55451'
          ),
        ...(videos.length > 0 && { Videos: videos })
      }
    };
    mutation.mutate(data);
  }

  React.useEffect(() => {
    if (Object.keys(submission || {}).length > 0) {
      setBasicInfoState(updateState(basicInfoState, submission?.BasicInfo || []));
      setProjectDetailState(updateState(projectDetailState, submission?.ProjectDetail || []));
      setAdditionState(
        updateState(additionState, [...(submission?.Additions || []), ...(submission?.Videos || [])] || [])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission]);

  return (
    <div className="flex flex-col gap-6">
      <label className="body-l text-neutral-off-black">
        Select the profile fields you wish to make mandatory in your hackathon application. The shorter your form is,
        the faster you stack up the applications.
      </label>
      <BasicInfo />
      <ProjectDetail />
      <Additions />
      <ActionButtons
        isValid
        isEditMode={isEditMode}
        isLoading={mutation.isPending}
        onCancelOrBack={onCancelOrBack}
        onSaveOrNext={onSaveOrNext}
      />
    </div>
  );
}
