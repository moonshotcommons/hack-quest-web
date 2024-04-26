import { StepItem } from '@/components/Common/Steps';
import { ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ProjectSubmitStepType })[] = [
  {
    title: 'Info',
    type: ProjectSubmitStepType.INFO
  },
  {
    title: 'Pitch Video',
    type: ProjectSubmitStepType.PITCH_VIDEO
  },
  {
    title: 'Project Demo',
    type: ProjectSubmitStepType.DEMO
  },
  {
    title: 'Others',
    type: ProjectSubmitStepType.OTHERS
  },
  {
    title: 'Wallet',
    type: ProjectSubmitStepType.WALLET
  },
  {
    title: 'Review',
    type: ProjectSubmitStepType.REVIEW
  }
];
