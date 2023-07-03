import { tuple } from '@/helper/utils';

const IconKeys = tuple(
  'Clock',
  'Completed',
  'Course',
  'Discord',
  'FlightSideWay',
  'Instagram',
  'LeftArrow',
  'RightArrow',
  'Twitter'
);

export type IconKey = (typeof IconKeys)[number];

export type IconsType = {
  [key in IconKey]: React.ReactNode;
};
