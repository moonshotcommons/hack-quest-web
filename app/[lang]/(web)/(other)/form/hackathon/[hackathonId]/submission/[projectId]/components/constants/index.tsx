import { StepItem } from '@/components/Common/Steps';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ProjectSubmitStepType; stepNumber: number })[] = [
  {
    title: 'Info',
    type: ProjectSubmitStepType.INFO,
    stepNumber: 0
  },
  {
    title: 'Pitch Video',
    type: ProjectSubmitStepType.PITCH_VIDEO,
    stepNumber: 1
  },
  {
    title: 'Project Demo',
    type: ProjectSubmitStepType.DEMO,
    stepNumber: 2
  },
  {
    title: 'Others',
    type: ProjectSubmitStepType.OTHERS,
    stepNumber: 3
  },
  {
    title: 'Wallet',
    type: ProjectSubmitStepType.WALLET,
    stepNumber: 4
  },
  {
    title: 'Review',
    type: ProjectSubmitStepType.REVIEW,
    stepNumber: 5
  }
];
