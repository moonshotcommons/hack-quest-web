export enum HackathonManageType {
  OVERVIEW = 'overview',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  JUDGE = 'judge'
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
