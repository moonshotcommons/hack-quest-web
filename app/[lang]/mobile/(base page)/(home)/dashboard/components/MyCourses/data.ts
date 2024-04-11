import { ProcessType } from '@/service/webApi/course/type';
import { TabListType } from '@/components/Web/Business/Tab/type';

export const courseTab: TabListType[] = [
  {
    label: 'dashboard.inProgress',
    value: ProcessType.IN_PROCESS
  },
  {
    label: 'dashboard.completed',
    value: ProcessType.COMPLETED
  }
];
