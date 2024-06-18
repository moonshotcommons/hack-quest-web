import { SubmissionSectionType } from '../type';
import { AdditionsSectionComponentList } from './Additions';
import { BasicInfoSectionComponentList } from './BasicInfo';
import { ProjectDetailSectionComponentList } from './ProjectDetail';

export const SubmissionSectionConfig = {
  [SubmissionSectionType.Additions]: AdditionsSectionComponentList,
  [SubmissionSectionType.BasicInfo]: BasicInfoSectionComponentList,
  [SubmissionSectionType.ProjectDetail]: ProjectDetailSectionComponentList
};

export * from './Additions';
export * from './BasicInfo';
export * from './ProjectDetail';
