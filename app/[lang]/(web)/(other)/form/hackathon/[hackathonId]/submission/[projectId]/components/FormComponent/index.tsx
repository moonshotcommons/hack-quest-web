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
  tracks: string[];
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, tracks, ...rest } = props;

  switch (type) {
    case ProjectSubmitStepType.INFO:
      return <InfoForm {...rest} info={formState.info} tracks={tracks} />;
    case ProjectSubmitStepType.PITCH_VIDEO:
      return <PitchVideoUpload {...rest} pickVideo={formState.pickVideo} />;
    case ProjectSubmitStepType.DEMO:
      return <ProjectDemoUpload {...rest} projectDemo={formState.projectDemo} />;
    case ProjectSubmitStepType.OTHERS:
      return <OthersForm {...rest} others={formState.others} />;
    case ProjectSubmitStepType.WALLET:
      return <ConnectWallet {...rest} wallet={formState.wallet} />;
    case ProjectSubmitStepType.REVIEW:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
