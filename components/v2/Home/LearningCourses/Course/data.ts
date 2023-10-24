import { ProcessType } from '@/service/webApi/course/type';
import { TabListType, TabValueType } from '@/components/v2/Tab/type';

export const courseTab: TabListType[] = [
  {
    label: 'In Process',
    value: ProcessType.IN_PROCESS
  },
  {
    label: 'Completed',
    value: ProcessType.COMPLETED
  }
];
