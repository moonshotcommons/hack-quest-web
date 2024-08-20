export interface HackathonType {
  id: string;
  name: string;
  alias: string;
  creatorId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  progress: string[];
  info: Record<string, any> | null;
}

// enum ReceiverType {
//   AllApplicants = 'All Applicants',
//   Approved = 'Approved',
//   Declined = 'Declined',
//   Waitlisted = 'Waitlisted',
//   Confirmed = 'Confirmed',
//   ApprovedButNotConfirmed = 'Approved but not confirmed',
//   Submitted = 'Submitted',
//   ConfirmedButNotSubmitted = 'Confirmed but not submitted',
//   SubmittedAndRewarded = 'Submitted and rewarded',
//   SubmittedButNonRewarded = 'Submitted but non-rewarded (0)'
// }

export enum ReceiverType {
  AllApplicants = 'allApplicants',
  Approved = 'approved',
  Declined = 'declined',
  Waitlisted = 'waitlisted',
  Confirmed = 'confirmed',
  ApprovedButNotConfirmed = 'notConfirmed',
  Submitted = 'submitted',
  ConfirmedButNotSubmitted = 'notSubmitted',
  SubmittedAndRewarded = 'submittedAndRewarded',
  SubmittedButNonRewarded = 'nonRewarded'
}

export enum AnnouncementAction {
  Send = 'send',
  Save = 'save'
}

export interface AnnouncementCreateDto {
  id?: number | string | null;
  title: string;
  message: string;
  timezone: string;
  plannedTime: string;
  rightNow: boolean;
  receivers: string;
  action?: AnnouncementAction;
  status?: string;
}

export interface Announcement {
  id?: number | string | null;
  title: string;
  status: 'draft' | 'waiting' | 'publish';
  message: string;
  timezone: string;
  hackathonId: string;
  createdAt: string;
  updatedAt: string;
  plannedTime: string;
  actualTime: string;
  rightNow: boolean;
  receivers: string;
  action?: AnnouncementAction;
}
