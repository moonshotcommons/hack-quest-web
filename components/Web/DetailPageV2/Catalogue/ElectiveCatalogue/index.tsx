import { FC } from 'react';
import ElectiveCatalogueItem from './ElectiveCatalogueItem';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';

interface ElectiveCatalogueProps {
  courseDetail: ElectiveCourseDetailType;
}

const ElectiveCatalogue: FC<ElectiveCatalogueProps> = (props) => {
  const { courseDetail } = props;

  return (
    <div className="flex flex-col">
      {courseDetail.pages!.map((lesson, index) => {
        if (index === 0) {
          return (
            <li key={lesson.id} className="relative w-full">
              <ElectiveCatalogueItem
                lesson={lesson}
                // isLock={false}
                index={index}
                courseDetail={courseDetail}
              ></ElectiveCatalogueItem>
            </li>
          );
        }
        return (
          <li key={lesson.id}>
            <hr className="my-4"></hr>
            <div className="relative w-full">
              <ElectiveCatalogueItem
                lesson={lesson}
                index={index}
                courseDetail={courseDetail}
              ></ElectiveCatalogueItem>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default ElectiveCatalogue;
