import {
  CourseLevel,
  CourseUser,
  CourseUserCount
} from '@/components/Web/Business/CourseTags';
import { tagFormate } from '@/helper/formate';
import React from 'react';
import InstructorCover from '@/public/images/home/instructor_cover.png';

interface InstructorCardFooterProp {}

const InstructorCardFooter: React.FC<InstructorCardFooterProp> = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[35%]">
        <CourseUser
          userImg={InstructorCover}
          userName={'userNameuserNameuserName'}
        />
      </div>
      <div className="flex flex-1 items-center justify-between pl-[2%]">
        <CourseLevel
          level={tagFormate('Beginner')}
          size={'small'}
        ></CourseLevel>
        <CourseUserCount count={9999} />
      </div>
    </div>
  );
};

export default InstructorCardFooter;
