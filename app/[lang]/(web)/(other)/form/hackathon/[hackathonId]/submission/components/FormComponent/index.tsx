import { FC } from 'react';
import { ProjectSubmitStepType } from '../constants';
import { HackathonSubmitStateType } from '../../type';
import InfoForm from './InfoForm';

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
    // case ProjectSubmitStepType.Contact:
    //   return <ContractForm {...rest} contractInfo={formState.contractInfo} />;
    // case ProjectSubmitStepType.Bio:
    //   return <BioForm {...rest} bio={formState.bio} />;
    // case ProjectSubmitStepType.SubmissionType:
    //   return <SubmissionTypeForm {...rest} submissionType={formState.submissionType} />;
    // case ProjectSubmitStepType.Review:
    //   return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
