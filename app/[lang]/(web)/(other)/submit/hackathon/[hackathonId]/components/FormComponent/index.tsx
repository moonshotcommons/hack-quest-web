import { FC } from 'react';
import { SubmitType } from '../constants';
import ContractForm from './ContractForm';
import NameForm from './NameForm';
import BioForm from './BioForm';
import SubmissionTypeForm from './SubmissionTypeForm';

export interface FormComponentProps {
  type: SubmitType;
  onNext: VoidFunction;
  onBack: VoidFunction;
}

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, ...rest } = props;
  switch (type) {
    case SubmitType.Name:
      return <NameForm {...rest} />;
    case SubmitType.Contact:
      return <ContractForm {...rest} />;
    case SubmitType.Bio:
      return <BioForm {...rest} />;
    case SubmitType.SubmissionType:
      return <SubmissionTypeForm {...rest} />;
    // case SubmitType.Name:
    //   return <NameForm />;
  }
};

export default FormComponent;
