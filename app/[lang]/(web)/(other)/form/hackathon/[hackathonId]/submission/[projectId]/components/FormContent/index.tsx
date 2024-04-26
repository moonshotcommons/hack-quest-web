'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonSubmitStateType } from '../../type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { isUuid } from '@/helper/utils';

interface HackathonSubmitPageProps {
  simpleHackathonInfo: { id: string; name: string; alias: string };
  projectId: string | undefined;
  tracks: string[];
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = ({ simpleHackathonInfo, projectId, tracks }) => {
  const [current, setCurrent] = useState(5);
  const [formState, setFormState] = useState<HackathonSubmitStateType>({
    projectId: '-1',
    info: {
      projectLogo: '',
      projectName: '',
      track: '',
      intro: '',
      detailedIntro: ''
    },
    pickVideo: '',
    projectDemo: '',
    others: {
      githubLink: '',
      isPublic: false
    },
    wallet: ''
  });

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

  const init = () => {
    // const { id, name, description, video, introduction, hackathonId, tracks,status } = projectInfo!;
    // const currentStep = HACKATHON_SUBMIT_STEPS.find((step) => step.type === status)!;
    // setCurrent(currentStep.stepNumber);
    // const { firstName, lastName, bio, status, weChat, team, userId, telegram, avatar } = registerInfo;
    // const currentStep = HACKATHON_SUBMIT_STEPS.find((step) => step.type === status)!;
    // setCurrent(currentStep.stepNumber);
    // const name = { firstName: firstName || '', lastName: lastName || '' };
    // const contractInfo = { weChat: weChat || '', telegram: telegram || '' };
    // const isSoloRegister = status === ProjectSubmitStepType.Review && !Object.keys(team || {}).length;
    // const isNullType = status === ProjectSubmitStepType.SubmissionType && !Object.keys(team || {}).length;
    // setFormState({
    //   ...formState,
    //   status: status,
    //   name,
    //   bio: bio || '',
    //   contractInfo,
    //   submissionType: {
    //     type: isNullType ? null : isSoloRegister ? 'Solo Project' : 'Group Project',
    //     groupType:
    //       !!Object.keys(team || {}).length && team.creatorId === userId
    //         ? 'owner'
    //         : !!Object.keys(team || {}).length
    //           ? 'member'
    //           : undefined,
    //     team: team || {},
    //     teamDetail: teamDetail || {},
    //     userId: userId || '',
    //     avatar: avatar || ''
    //   }
    // });
  };

  // const { run, refreshAsync: refreshRegisterInfo } = useRequest(
  //   async () => {
  //     return webApi.resourceStationApi.getProjectsDetail(projectId!);
  //   },
  //   {
  //     manual: true,
  //     onSuccess(res) {
  //       // if (res.status) init(registerInfo, teamDetail);
  //       // else setCurrent(0);
  //     },
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  // const register = useCallback(
  //   async ({ resolve, reject }: any) => {
  //     try {
  //       if (formState.status === ProjectSubmitStepType.Review) {
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

  const edit = useCallback(() => {
    redirectToUrl(`/hackathon/${simpleHackathonInfo.alias}`);
  }, [simpleHackathonInfo, redirectToUrl]);

  // useEffect(() => {
  //   run();
  //   emitter.on('submit-form-save', register);
  //   emitter.on('submit-form-exit', edit);
  //   return () => {
  //     emitter.off('submit-form-save', register);
  //     emitter.off('submit-form-exit', edit);
  //   };
  // }, [register, edit]);

  useEffect(() => {
    if (projectId && isUuid(projectId)) init();
    else setCurrent(0);
  }, [projectId]);

  return (
    <div className="flex w-full flex-col justify-center gap-6 text-center">
      <FormHeader
        steps={HACKATHON_SUBMIT_STEPS}
        current={current}
        description="Hackathon Submission"
        title={simpleHackathonInfo?.name || ''}
      />
      <FormComponent
        type={HACKATHON_SUBMIT_STEPS[current].type}
        onNext={onNext}
        onBack={onBack}
        tracks={tracks}
        setCurrentStep={setCurrentStep}
        formState={formState}
      />
    </div>
  );
};

export default HackathonSubmitPage;
