import React, { useRef } from 'react';
import CourseCard from '@/components/v2/Business/CourseCard';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '@/components/v2/Business/MiniElectiveDetailModal';

interface CourseListProps {
  list: CourseResponse[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  const miniElectiveDetailInstance = useRef<MiniElectiveDetailModalRef>(null);

  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px] h-full">
      {list.map((course, index) => (
        <CourseCard
          key={course?.id + index}
          course={course}
          baseProgress={true}
          onCourseClick={(course) => {
            if (course.type === CourseType.Mini) {
              miniElectiveDetailInstance.current?.open(course);
            }
          }}
        ></CourseCard>
      ))}
      <MiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </div>
  );
};

export default CourseList;
