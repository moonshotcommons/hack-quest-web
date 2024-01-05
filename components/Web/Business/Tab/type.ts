import { ProcessType } from '@/service/webApi/course/type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

export type TabValueType = ProcessType & HackathonStatusType;

export interface TabListType {
  label: string;
  value: ProcessType | HackathonStatusType;
  type?: 'link' | 'tab';
}
