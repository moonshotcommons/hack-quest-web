import { SubmissionSectionType } from '@/components/HackathonCreation/type';
import { Additions, BasicInfo, ProjectDetail, Videos } from '@/service/webApi/resourceStation/type';

export interface ContractInfo {
  wechat: string;
  telegram: string;
}

export interface SubmissionType {
  type: 'Solo Project' | 'Group Project' | null;
  groupType: string;
  members: {
    role: string;
    info: {
      name: string;
    };
  }[];
}

export interface ProjectSubmitStateType {
  projectId: string;
  [SubmissionSectionType.BasicInfo]: Partial<BasicInfo> & Record<string, any>;
  [SubmissionSectionType.ProjectDetail]: Partial<ProjectDetail> & Record<string, any>;
  [SubmissionSectionType.Videos]: Partial<Videos> & Record<string, any>;
  [SubmissionSectionType.Additions]: Partial<Additions> & Record<string, any>;
  status: SubmissionSectionType | 'Review';
  isSubmit: boolean;
}
