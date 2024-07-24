export enum HackathonManageType {
  OVERVIEW = 'overview',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  JUDGE = 'judging',
  ANNOUNCEMENT = 'announcement'
}

export enum SubmissionStatus {
  WEB3 = 'web3',
  HACKQUEST = 'hackquest'
}

export interface SelectType {
  value: string;
  label: string;
}

export interface AuditTabType {
  value: string;
  label: string;
  count: number;
}

export interface InformationDataType {
  value: string;
  label: string;
  disabled?: boolean;
}
