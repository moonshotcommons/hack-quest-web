import { FC } from 'react';
import { ProjectSubmitStepType } from '../constants';
import { HackathonSubmitStateType } from '../../type';
import InfoForm from './InfoForm';
import PitchVideoUpload from './PitchVideoUpload';
import ProjectDemoUpload from './ProjectDemoUpload';
import OthersForm from './OthersForm';
import ConnectWallet from './ConnectWallet';
import SubmitReview from './SubmitReview';

export interface FormComponentProps {
  type: ProjectSubmitStepType;
  onNext: (state: Partial<HackathonSubmitStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonSubmitStateType;
  setCurrentStep: (step: number) => void;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, ...rest } = props;

  switch (type) {
    case ProjectSubmitStepType.Info:
      return <InfoForm {...rest} info={formState.info} />;
    case ProjectSubmitStepType.PitchVideo:
      return <PitchVideoUpload {...rest} pickVideo={formState.pickVideo} />;
    case ProjectSubmitStepType.ProjectDemo:
      return <ProjectDemoUpload {...rest} projectDemo={formState.projectDemo} />;
    case ProjectSubmitStepType.Others:
      return <OthersForm {...rest} others={formState.others} />;
    case ProjectSubmitStepType.Wallet:
      return <ConnectWallet {...rest} wallet={formState.wallet} />;
    case ProjectSubmitStepType.Review:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
