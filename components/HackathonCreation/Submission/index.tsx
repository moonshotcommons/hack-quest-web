import { SubmissionSectionType } from '../type';
import { AdditionsSectionComponentList } from './Additions';
import { BasicInfoSectionComponentList } from './BasicInfo';
import { ProjectDetailSectionComponentList } from './ProjectDetail';
import { VideosSectionComponentList } from './Videos';

export const SubmissionSectionConfig = {
  [SubmissionSectionType.BasicInfo]: BasicInfoSectionComponentList,
  [SubmissionSectionType.ProjectDetail]: ProjectDetailSectionComponentList,
  [SubmissionSectionType.Videos]: VideosSectionComponentList,
  [SubmissionSectionType.Additions]: AdditionsSectionComponentList
};

export * from './Additions';
export * from './BasicInfo';
export * from './ProjectDetail';
export * from './Videos';
