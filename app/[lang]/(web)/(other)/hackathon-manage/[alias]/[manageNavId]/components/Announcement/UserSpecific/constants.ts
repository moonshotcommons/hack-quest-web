import { ReceiverType } from '@/service/webApi/hackathon/types';

export const receiversHybird = {
  [ReceiverType.AllApplicants]: 'All applicants',
  [ReceiverType.Approved]: 'Approved',
  [ReceiverType.Declined]: 'Declined',
  [ReceiverType.Waitlisted]: 'Waitlisted',
  [ReceiverType.Confirmed]: 'Confirmed',
  [ReceiverType.ApprovedButNotConfirmed]: 'Approved but not confirmed',
  [ReceiverType.Submitted]: 'Submitted',
  [ReceiverType.ConfirmedButNotSubmitted]: 'Confirmed but not submitted',
  [ReceiverType.SubmittedAndRewarded]: 'Submitted and rewarded',
  [ReceiverType.SubmittedButNonRewarded]: 'Submitted but non-rewarded'
};

export const receiversOnline = {
  [ReceiverType.AllApplicants]: 'All applicants',
  [ReceiverType.Submitted]: 'Submitted',
  [ReceiverType.SubmittedAndRewarded]: 'Submitted and rewarded',
  [ReceiverType.SubmittedButNonRewarded]: 'Submitted but non-rewarded'
};

export enum HackathonModeEnum {
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID'
}
