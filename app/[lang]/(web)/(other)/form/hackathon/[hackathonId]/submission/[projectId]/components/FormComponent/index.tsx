import { FC } from 'react';
import { HackathonSubmitStateType } from '../../type';
import InfoForm from './InfoForm';
import PitchVideoUpload from './PitchVideoUpload';
import ProjectDemoUpload from './ProjectDemoUpload';
import OthersForm from './OthersForm';
import ConnectWallet from './ConnectWallet';
import SubmitReview from './SubmitReview';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export interface FormComponentProps {
  type: ProjectSubmitStepType;
  onNext: (state: Partial<HackathonSubmitStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonSubmitStateType;
  setCurrentStep: (step: number) => void;
  simpleHackathonInfo: { id: string; name: string; alias: string };
  tracks: string[];
  projectId: string | undefined;
  refreshProjectInfo: VoidFunction;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, tracks, ...rest } = props;

  switch (type) {
    case ProjectSubmitStepType.INFO:
      return (
        <InfoForm
          {...rest}
          info={formState.info}
          tracks={tracks}
          status={formState.status}
          isSubmit={formState.isSubmit}
        />
      );
    case ProjectSubmitStepType.PITCH_VIDEO:
      return (
        <PitchVideoUpload
          {...rest}
          pitchVideo={formState.pitchVideo}
          status={formState.status}
          isSubmit={formState.isSubmit}
        />
      );
    case ProjectSubmitStepType.DEMO:
      return (
        <ProjectDemoUpload
          {...rest}
          projectDemo={formState.projectDemo}
          status={formState.status}
          isSubmit={formState.isSubmit}
        />
      );
    case ProjectSubmitStepType.OTHERS:
      return <OthersForm {...rest} others={formState.others} status={formState.status} isSubmit={formState.isSubmit} />;
    case ProjectSubmitStepType.WALLET:
      return (
        <ConnectWallet {...rest} wallet={formState.wallet} status={formState.status} isSubmit={formState.isSubmit} />
      );
    case ProjectSubmitStepType.REVIEW:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
