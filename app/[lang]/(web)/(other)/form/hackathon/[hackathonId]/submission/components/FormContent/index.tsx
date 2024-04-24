'use client';
import { FC, useCallback, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from '../constants';
import FormComponent from '../FormComponent';
import FormHeader from '../FormHeader';
import { HackathonSubmitStateType } from '../../type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { useRedirect } from '@/hooks/router/useRedirect';

interface HackathonSubmitPageProps {
  simpleHackathonInfo: { id: string; name: string; alias: string };
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = ({ simpleHackathonInfo }) => {
  const [current, setCurrent] = useState(5);
  const [formState, setFormState] = useState<HackathonSubmitStateType>({
    info: {
      projectLogo: 'dddddddddddddddddd',
      projectName: '测试项目',
      track: 'AI + Web3 Applications',
      intro: 'ffffffffffffffffffffffffffff',
      detailedIntro: 'ffffffffffffffffffffffffffffffffffff'
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

  const init = (registerInfo: any, teamDetail: any | {}) => {
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
        setCurrentStep={setCurrentStep}
        formState={formState}
      />
    </div>
  );
};

export default HackathonSubmitPage;
