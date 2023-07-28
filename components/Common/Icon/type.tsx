import { tuple } from '@/helper/formate';

const IconKeys = tuple(
  'Bottom',
  'Clock',
  'Close',
  'Copy',
  'Course',
  'Discord',
  'DropDown',
  'EmailFill',
  'FlightSideWay',
  'Instagram',
  'LeftArrow',
  'Lock',
  'Pass',
  'Progress',
  'Right',
  'RightArrow',
  'RightBottom',
  'Setting',
  'SignOut',
  'Skip',
  'Twitter',
  'User',
  'UserFill'
);

export type IconKey = (typeof IconKeys)[number];

export type IconsType = {
  [key in IconKey]: React.ReactNode;
};
