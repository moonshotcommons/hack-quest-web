export enum HackathonManageType {
  OVERVIEW = 'overview',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  JUDGE = 'judging',
  ANNOUNCEMENT = 'announcement',
  DISTRIBUTION = 'distribution'
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

export enum DistributionTab {
  PAGE_VIEW = 'pageView',
  REGISTRATION = 'registration',
  SUBMISSION = 'submission',
  WINNERS = 'winners'
}

export enum GrowthOptionValue {
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all'
}
