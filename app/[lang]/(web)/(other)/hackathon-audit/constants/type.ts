export enum HackathonAuditType {
  OVERVIEW = 'overview',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  JUDGE = 'judge'
}

export enum ApplicationStatus {
  REVIEW = 'review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WAIT = 'wait'
}

export enum SubmissionStatus {
  WEB3 = 'web3',
  HACKQUEST = 'hackquest'
}

export interface InformationType {
  value: string;
  label: string;
}

export interface AuditTabType {
  value: string;
  label: string;
  count: number;
}
