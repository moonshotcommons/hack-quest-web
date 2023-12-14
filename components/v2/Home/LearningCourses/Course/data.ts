import { ProcessType } from '@/service/webApi/course/type';
import { TabListType } from '@/components/v2/Business/Tab/type';

export const courseTab: TabListType[] = [
  {
    label: 'In Progress',
    value: ProcessType.IN_PROCESS
  },
  {
    label: 'Completed',
    value: ProcessType.COMPLETED
  }
];
