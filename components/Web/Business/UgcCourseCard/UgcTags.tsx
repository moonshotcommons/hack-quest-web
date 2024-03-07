import React from 'react';
import { CourseLevel, CourseUser, CourseUserCount } from '../CourseTags';
import { tagFormate } from '@/helper/formate';
import InstructorCover from '@/public/images/home/instructor_cover.png';
import { ProjectCourseType } from '@/service/webApi/course/type';

interface UgcTagsProp {
  isPublic: boolean;
  course: ProjectCourseType;
}

const UgcTags: React.FC<UgcTagsProp> = ({ isPublic, course }) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`${isPublic ? 'w-[60%]' : 'w-[35%]'}`}>
        <CourseUser userImg={InstructorCover} userName={'userName'} />
      </div>
      <div
        className={`flex flex-1 items-center  pl-[2%] ${isPublic ? 'justify-end' : 'justify-between'}`}
      >
        <CourseLevel
          level={tagFormate(course.level)}
          size={'small'}
        ></CourseLevel>
        {!isPublic && <CourseUserCount count={course.peopleJoined} />}
      </div>
    </div>
  );
};

export default UgcTags;
