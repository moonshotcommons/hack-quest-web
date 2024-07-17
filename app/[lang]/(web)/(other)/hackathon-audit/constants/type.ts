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

export interface InformationType {
  value: string;
  label: string;
}
