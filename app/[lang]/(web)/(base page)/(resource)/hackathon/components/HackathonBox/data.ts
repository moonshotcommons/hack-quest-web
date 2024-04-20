import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

export const hackathonTab = [
  {
    label: 'onGoingHackathon',
    value: HackathonStatusType.ON_GOING,
    type: 'tab'
  },
  {
    label: 'pastHackathon',
    value: HackathonStatusType.PAST,
    type: 'tab'
  }
];
