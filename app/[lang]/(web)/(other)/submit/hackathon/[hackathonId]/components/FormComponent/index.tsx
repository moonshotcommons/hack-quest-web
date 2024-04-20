import { FC } from 'react';
import { SubmitType } from '../constants';
import ContractForm from './ContractForm';
import NameForm from './NameForm';
import BioForm from './BioForm';
import SubmissionTypeForm from './SubmissionTypeForm';
import { HackathonSubmitStateType } from '../../type';
import SubmitReview from './SubmitReview';

export interface FormComponentProps {
  type: SubmitType;
  onNext: (state: Partial<HackathonSubmitStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonSubmitStateType;
  setCurrentStep: (step: number) => void;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, ...rest } = props;
  switch (type) {
    case SubmitType.Name:
      return <NameForm {...rest} name={formState.name} />;
    case SubmitType.Contact:
      return <ContractForm {...rest} contractInfo={formState.contractInfo} />;
    case SubmitType.Bio:
      return <BioForm {...rest} bio={formState.bio} />;
    case SubmitType.SubmissionType:
      return <SubmissionTypeForm {...rest} submissionType={formState.submissionType} />;
    case SubmitType.Review:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
