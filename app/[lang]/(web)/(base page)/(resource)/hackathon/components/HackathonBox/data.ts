import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

export const hackathonTab = [
  {
    label: 'Ongoing Hackathons',
    value: HackathonStatusType.ON_GOING,
    type: 'tab'
  },
  {
    label: 'Past Hackathons',
    value: HackathonStatusType.PAST,
    type: 'tab'
  }
];
