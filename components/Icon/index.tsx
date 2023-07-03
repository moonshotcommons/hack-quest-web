import React from 'react';

import ClockIcon from './Clock';
import CompletedIcon from './Completed';
import CourseIcon from './Course';
import DiscordIcon from './Discord';
import InstagramIcon from './Instagram';
import LeftArrowIcon from './LeftArrow';
import RightArrowIcon from './RightArrow';
import TwitterIcon from './Twitter';

import { IconsType } from './type';

const Icons: IconsType = {
  Clock: <ClockIcon />,
  Completed: <CompletedIcon />,
  Course: <CourseIcon />,
  Discord: <DiscordIcon />,
  Instagram: <InstagramIcon />,
  LeftArrow: <LeftArrowIcon />,
  RightArrow: <RightArrowIcon />,
  Twitter: <TwitterIcon />
};

export default Icons;
