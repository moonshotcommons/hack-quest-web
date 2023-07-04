import { tuple } from '@/helper/utils';

const IconKeys = tuple(
  'Clock',
  'progress',
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
