import { CourseDetailType, CourseType, ProcessType, ProjectCourseType } from '@/service/webApi/course/type';
import React from 'react';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface CourseListProp {
  list: CourseDetailType[];
  curTab: ProcessType;
}

const CourseList: React.FC<CourseListProp> = ({ list, curTab }) => {
  const card = (course: CourseDetailType) => {
    switch (course.type) {
      case CourseType.MINI:
      case CourseType.UGC:
        return <ElectiveCard course={course as ElectiveCourseType} from={'dashboard'} inProgress={curTab === ProcessType.IN_PROCESS} />;
      case CourseType.GUIDED_PROJECT:
        return <PracticeCard course={course as ProjectCourseType} from={'dashboard'} inProgress={curTab === ProcessType.IN_PROCESS} />;
    }
  };
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Courses</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((course) => (
          <div key={course.id} className="w-[calc((100%-48px)/3)]">
            {card(course)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
