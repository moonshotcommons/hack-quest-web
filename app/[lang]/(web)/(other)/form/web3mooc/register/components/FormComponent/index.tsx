import { FC } from 'react';
import ContractForm from './ContractForm';
import NameForm from './NameForm';
import BioForm from './BioForm';
import { HackathonRegisterStateType } from '../../type';
import SubmitReview from './SubmitReview';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';
import { NtuRegisterInfo } from '@/service/webApi/course/type';

export interface FormComponentProps {
  type: HackathonRegisterStep;
  onNext: (state: Partial<HackathonRegisterStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonRegisterStateType;
  setCurrentStep: (step: number) => void;
  refreshRegisterInfo: () => Promise<NtuRegisterInfo>;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, ...rest } = props;
  switch (type) {
    case HackathonRegisterStep.Name:
      return <NameForm {...rest} name={formState.name} status={formState.status} isRegister={formState.isRegister} />;
    case HackathonRegisterStep.Contact:
      return (
        <ContractForm
          {...rest}
          contractInfo={formState.contractInfo}
          status={formState.status}
          isRegister={formState.isRegister}
        />
      );
    case HackathonRegisterStep.Bio:
      return <BioForm {...rest} bio={formState.bio} status={formState.status} isRegister={formState.isRegister} />;

    case HackathonRegisterStep.Review:
      return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
