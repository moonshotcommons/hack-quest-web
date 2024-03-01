import { FC } from 'react';
import LessonCatalogueItem from './LessonCatalogueItem';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';

interface ElectiveCatalogueProps {
  courseDetail: ElectiveCourseDetailType;
}

const ElectiveCatalogue: FC<ElectiveCatalogueProps> = (props) => {
  const { courseDetail } = props;

  return (
    <div className="flex list-none flex-col">
      {courseDetail.pages!.map((lesson, index) => {
        if (index === 0) {
          return (
            <li key={lesson.id} className="relative w-full">
              <LessonCatalogueItem
                lesson={lesson}
                // isLock={false}
                index={index}
                courseDetail={courseDetail}
              ></LessonCatalogueItem>
            </li>
          );
        }
        return (
          <li key={lesson.id} className="relative w-full">
            <hr className="my-4"></hr>
            <div className="relative w-full">
              <LessonCatalogueItem
                lesson={lesson}
                index={index}
                courseDetail={courseDetail}
              ></LessonCatalogueItem>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default ElectiveCatalogue;
