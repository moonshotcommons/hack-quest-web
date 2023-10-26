import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';
import { TabListType, TabValueType } from '@/components/v2/Tab/type';

export const hackathonTab: TabListType[] = [
  {
    label: 'Ongoing Hackathon',
    value: HackathonType.ON_GOING,
    type: 'tab'
  },
  {
    label: 'Past Hackathon',
    value: HackathonType.PAST,
    type: 'tab'
  },
  {
    label: 'All Projects',
    value: HackathonType.ALL_PROJECT,
    type: 'link'
  }
];
