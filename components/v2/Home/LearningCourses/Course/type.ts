import { ProcessType } from '@/service/webApi/course/type';
export interface CourseTabType {
  label: string;
  value: ProcessType;
}
export const courseTab: CourseTabType[] = [
  {
    label: 'In Process',
    value: ProcessType.IN_PROCESS
  },
  {
    label: 'Completed',
    value: ProcessType.COMPLETED
  }
];
