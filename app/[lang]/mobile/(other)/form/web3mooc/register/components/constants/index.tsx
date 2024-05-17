import { StepItem } from '@/components/Common/Steps';
import { NtuRegisterStep } from '@/service/webApi/course/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: NtuRegisterStep; stepNumber: number })[] = [
  {
    title: 'Name',
    type: NtuRegisterStep.Name,
    stepNumber: 0
  },
  {
    title: 'Contact',
    type: NtuRegisterStep.Contact,
    stepNumber: 1
  },
  {
    title: 'Additional Info',
    type: NtuRegisterStep.ADDITIONAL_INFO,
    stepNumber: 2
  }
];
