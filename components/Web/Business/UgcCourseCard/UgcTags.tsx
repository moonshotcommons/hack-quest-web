import React from 'react';
import { CourseLevel, CourseUser, CourseUserCount } from '../CourseTags';
import { tagFormate } from '@/helper/formate';
import InstructorCover from '@/public/images/home/instructor_cover.png';

interface UgcTagsProp {
  isPublic: boolean;
}

const UgcTags: React.FC<UgcTagsProp> = ({ isPublic }) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`${isPublic ? 'w-[60%]' : 'w-[35%]'}`}>
        <CourseUser
          userImg={InstructorCover}
          userName={'userNameuserNameuserName'}
        />
      </div>
      <div
        className={`flex flex-1 items-center  pl-[2%] ${isPublic ? 'justify-end' : 'justify-between'}`}
      >
        <CourseLevel
          level={tagFormate('Beginner')}
          size={'small'}
        ></CourseLevel>
        {!isPublic && <CourseUserCount count={9999} />}
      </div>
    </div>
  );
};

export default UgcTags;
