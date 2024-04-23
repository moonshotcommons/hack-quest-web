import { FC } from 'react';
import ContractForm from './ContractForm';
import NameForm from './NameForm';
import BioForm from './BioForm';
import SubmissionTypeForm from './SubmissionTypeForm';
import { HackathonRegisterStateType } from '../../type';
import SubmitReview from './SubmitReview';
import {
  HackathonRegisterInfo,
  HackathonRegisterStep,
  HackathonTeamDetail
} from '@/service/webApi/resourceStation/type';

export interface FormComponentProps {
  type: HackathonRegisterStep;
  onNext: (state: Partial<HackathonRegisterStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonRegisterStateType;
  setCurrentStep: (step: number) => void;
  simpleHackathonInfo: { id: string; name: string; alias: string };
  refreshRegisterInfo: () => Promise<{ registerInfo: HackathonRegisterInfo; teamDetail: HackathonTeamDetail | {} }>;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, ...rest } = props;
  switch (type) {
    case HackathonRegisterStep.Name:
      return <NameForm {...rest} name={formState.name} status={formState.status} />;
    case HackathonRegisterStep.Contact:
      return <ContractForm {...rest} contractInfo={formState.contractInfo} status={formState.status} />;
    case HackathonRegisterStep.Bio:
      return <BioForm {...rest} bio={formState.bio} status={formState.status} />;
    case HackathonRegisterStep.SubmissionType:
      return <SubmissionTypeForm {...rest} submissionType={formState.submissionType} status={formState.status} />;
    case HackathonRegisterStep.Review:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
