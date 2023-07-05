import { tuple } from '@/helper/formate';

const IconKeys = tuple(
  'Clock',
  'Course',
  'Discord',
  'FlightSideWay',
  'Instagram',
  'LeftArrow',
  'Progress',
  'RightArrow',
  'Twitter',
  'User'
);

export type IconKey = (typeof IconKeys)[number];

export type IconsType = {
  [key in IconKey]: React.ReactNode;
};
