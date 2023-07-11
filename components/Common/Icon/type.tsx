import { tuple } from '@/helper/formate';

const IconKeys = tuple(
  'Bottom',
  'Clock',
  'Course',
  'Discord',
  'DropDown',
  'FlightSideWay',
  'Instagram',
  'LeftArrow',
  'Lock',
  'Progress',
  'Right',
  'RightArrow',
  'RightBottom',
  'Skip',
  'Twitter',
  'User'
);

export type IconKey = (typeof IconKeys)[number];

export type IconsType = {
  [key in IconKey]: React.ReactNode;
};
