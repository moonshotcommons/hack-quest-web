import { tuple } from '@/helper/formate';

const IconKeys = tuple(
  'Bottom',
  'Check',
  'Clock',
  'Close',
  'Copy',
  'Course',
  'DarkInstagram',
  'Discord',
  'DropDown',
  'EmailFill',
  'Eye',
  'FlightSideWay',
  'LeftArrow',
  'LightInstagram',
  'Lock',
  'Pass',
  'Progress',
  'Right',
  'RightArrow',
  'RightBottom',
  'Setting',
  'SignOut',
  'Skip',
  'Theme',
  'Twitter',
  'User',
  'UserFill',
  'Warning',
  'Telegram'
);

export type IconKey = (typeof IconKeys)[number];

export type IconsType = {
  [key in IconKey]: React.ReactNode;
};
