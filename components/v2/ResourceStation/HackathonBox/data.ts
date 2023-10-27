import { HackathonStatusType } from '@/service/webApi/resourceStation/hackathon/type';
import { TabListType, TabValueType } from '@/components/v2/Tab/type';

export const hackathonTab: TabListType[] = [
  {
    label: 'Ongoing Hackathon',
    value: HackathonStatusType.ON_GOING,
    type: 'tab'
  },
  {
    label: 'Past Hackathon',
    value: HackathonStatusType.PAST,
    type: 'tab'
  },
  {
    label: 'All Projects',
    value: HackathonStatusType.ALL_PROJECT,
    type: 'link'
  }
];
