import { FC } from 'react';
import ContractForm from './ContractForm';
import NameForm from './NameForm';
import BioForm from './BioForm';
import { HackathonRegisterStateType } from '../../type';
import { NtuRegisterInfo, NtuRegisterStep } from '@/service/webApi/course/type';

export interface FormComponentProps {
  type: NtuRegisterStep;
  onNext: (state: Partial<HackathonRegisterStateType>) => void;
  onBack: VoidFunction;
  formState: HackathonRegisterStateType;
  setCurrentStep: (step: number) => void;
  refreshRegisterInfo: () => Promise<NtuRegisterInfo>;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, formState, setCurrentStep, ...rest } = props;
  switch (type) {
    case NtuRegisterStep.Name:
      return <NameForm {...rest} name={formState.name} status={formState.status} isRegister={formState.isRegister} />;
    case NtuRegisterStep.Contact:
      return (
        <ContractForm
          {...rest}
          contractInfo={formState.contractInfo}
          status={formState.status}
          isRegister={formState.isRegister}
        />
      );
    case NtuRegisterStep.ADDITIONAL_INFO:
      return (
        <BioForm
          {...rest}
          additionalInfo={formState.additionalInfo}
          status={formState.status}
          isRegister={formState.isRegister}
        />
      );

    // case NtuRegisterStep.Review:
    //   return <SubmitReview {...rest} formState={formState} setCurrentStep={setCurrentStep} />;
  }
};

export default FormComponent;
