import { StepItem } from '@/components/Common/Steps';

export enum SubmitType {
  Name = 'Name',
  Contact = 'Contact',
  Bio = 'Bio',
  SubmissionType = 'Submission Type',
  Review = 'Review'
}

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: SubmitType })[] = [
  {
    title: 'Name',
    type: SubmitType.Name
  },
  {
    title: 'Contact',
    type: SubmitType.Contact
  },
  {
    title: 'Bio',
    type: SubmitType.Bio
  },
  {
    title: 'Submission Type',
    type: SubmitType.SubmissionType
  },
  {
    title: 'Review',
    type: SubmitType.Review
  }
];
