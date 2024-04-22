import { StepItem } from '@/components/Common/Steps';

export enum ProjectSubmitStepType {
  Info = 'Info',
  PitchVideo = 'Pitch Video',
  ProjectDemo = 'Project Demo',
  Others = 'Others',
  Wallet = 'Wallet',
  Review = 'Review'
}

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ProjectSubmitStepType })[] = [
  {
    title: 'Info',
    type: ProjectSubmitStepType.Info
  },
  {
    title: 'Pitch Video',
    type: ProjectSubmitStepType.PitchVideo
  },
  {
    title: 'Project Demo',
    type: ProjectSubmitStepType.ProjectDemo
  },
  {
    title: 'Others',
    type: ProjectSubmitStepType.Others
  },
  {
    title: 'Wallet',
    type: ProjectSubmitStepType.Wallet
  },
  {
    title: 'Review',
    type: ProjectSubmitStepType.Review
  }
];
