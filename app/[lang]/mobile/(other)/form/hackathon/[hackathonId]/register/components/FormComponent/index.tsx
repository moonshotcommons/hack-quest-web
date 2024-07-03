import { FC } from 'react';

import { HackathonRegisterStateType } from '../../type';
import SubmitReview from './SubmitReview';
import { HackathonRegisterInfo, HackathonTeamDetail, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import AboutSectionForm from './AboutSectionForm';
import OnlineProfilesSectionForm from './OnlineProfilesSectionForm';
import ContactSectionForm from './ContactSectionForm';
import ApplicationTypeSectionForm from './ApplicationTypeSectionForm';

export interface FormComponentProps {
  type: ApplicationSectionType | 'Review';
  hackathonInfo: SimpleHackathonInfo;
  formState: HackathonRegisterStateType;
  setCurrentStep: (step: number) => void;
  refreshRegisterInfo: () => Promise<{ registerInfo: HackathonRegisterInfo; teamDetail: HackathonTeamDetail | {} }>;
}

export type CommonFormComponentProps = Pick<FormComponentProps, 'refreshRegisterInfo'> & {
  info: HackathonRegisterStateType['info'];
  isRegister: boolean;
};

const FormComponent: FC<FormComponentProps> = (props) => {
  const { type, hackathonInfo, formState, setCurrentStep, ...rest } = props;
  const { info, isRegister } = formState;
  const { About, OnlineProfiles, Contact, ApplicationType } = hackathonInfo.info.application;

  switch (type) {
    case ApplicationSectionType.About:
      return <AboutSectionForm sectionConfig={About} info={info} isRegister={isRegister} {...rest} />;
    case ApplicationSectionType.OnlineProfiles:
      return <OnlineProfilesSectionForm sectionConfig={OnlineProfiles} info={info} isRegister={isRegister} {...rest} />;
    case ApplicationSectionType.Contact:
      return <ContactSectionForm sectionConfig={Contact} info={info} isRegister={isRegister} {...rest} />;
    case ApplicationSectionType.ApplicationType:
      return (
        <ApplicationTypeSectionForm sectionConfig={ApplicationType} info={info} isRegister={isRegister} {...rest} />
      );
    case 'Review':
      return (
        <SubmitReview
          info={info}
          isRegister={isRegister}
          sectionConfig={hackathonInfo.info.application}
          {...rest}
          setCurrentStep={setCurrentStep}
        />
      );
  }
};

export default FormComponent;
