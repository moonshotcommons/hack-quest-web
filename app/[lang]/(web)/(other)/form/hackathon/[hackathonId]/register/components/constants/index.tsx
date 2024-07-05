import { StepItem } from '@/components/Common/Steps';
import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ApplicationSectionType | 'Review'; stepNumber: number })[] = [
  {
    title: 'About',
    type: ApplicationSectionType.About,
    stepNumber: 0
  },
  {
    title: 'Online Profiles',
    type: ApplicationSectionType.OnlineProfiles,
    stepNumber: 1
  },
  {
    title: 'Contact',
    type: ApplicationSectionType.Contact,
    stepNumber: 2
  },
  {
    title: 'Submission Type',
    type: ApplicationSectionType.ApplicationType,
    stepNumber: 3
  },
  {
    title: 'Review',
    type: 'Review',
    stepNumber: 4
  }
];

export const getHackathonRegisterSteps = (application: SimpleHackathonInfo['info']['application']) => {
  const sections = Object.keys(application) as ApplicationSectionType[];
  return HACKATHON_SUBMIT_STEPS.filter(
    (item) => sections.includes(item.type as ApplicationSectionType) || item.type === 'Review'
  ).map((item, index) => ({ ...item, stepNumber: index }));
};

export const getHackathonStepInfo = (hackatgonSteps: typeof HACKATHON_SUBMIT_STEPS, type: ApplicationSectionType) => {
  const currentStep = hackatgonSteps.find((step) => step.type === type)!;
  const nextStep = currentStep && hackatgonSteps[currentStep.stepNumber + 1];
  return { currentStep, nextStep };
};
