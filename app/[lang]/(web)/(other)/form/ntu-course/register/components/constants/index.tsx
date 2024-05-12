import { StepItem } from '@/components/Common/Steps';
import { HackathonRegisterStep } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: HackathonRegisterStep; stepNumber: number })[] = [
  {
    title: 'Name',
    type: HackathonRegisterStep.Name,
    stepNumber: 0
  },
  {
    title: 'Contact',
    type: HackathonRegisterStep.Contact,
    stepNumber: 1
  },
  {
    title: 'Bio',
    type: HackathonRegisterStep.Bio,
    stepNumber: 2
  }
];
