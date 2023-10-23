import { ProcessType } from '@/service/webApi/course/type';
import { HackathonType } from '@/service/webApi/resourceStation/type';

export type TabValueType = ProcessType & HackathonType;

export interface TabListType {
  label: string;
  value: ProcessType | HackathonType;
  type?: 'link' | 'tab';
}
