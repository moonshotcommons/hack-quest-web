import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';
import UnitCard from './UnitCard';

interface UnitListProps {
  courseDetail: CourseDetailType;
  learningLessonId: string;
}

const UnitList: FC<UnitListProps> = (props) => {
  const { courseDetail, learningLessonId } = props;

  const { units = [], type: courseType } = courseDetail;

  return (
    <ul className="w-full">
      {units.map((unit, index) => {
        if (index === 0) {
          return (
            <li key={unit.id} className="w-full relative top-line bottom-line">
              <UnitCard
                unit={unit}
                isLock={false}
                courseType={courseType}
                index={index}
                courseDetail={courseDetail}
                learningLessonId={learningLessonId}
              ></UnitCard>
            </li>
          );
        }
        return (
          <li key={unit.id} className="w-full relative bottom-line">
            <UnitCard
              unit={unit}
              isLock={units[index - 1].progress < 1 && unit.progress === 0}
              courseType={courseType}
              index={index}
              courseDetail={courseDetail}
              learningLessonId={learningLessonId}
            ></UnitCard>
          </li>
        );
      })}
    </ul>
  );
};

export default UnitList;
