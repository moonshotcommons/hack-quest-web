import { CourseDetailType } from '@/service/webApi/course/type';
import { FC } from 'react';
import PracticeCatalogueItem from './PracticeCatalogueItem';

interface CourseCatalogueProps {
  courseDetail: CourseDetailType;
}

const CourseCatalogue: FC<CourseCatalogueProps> = (props) => {
  const { courseDetail } = props;

  return (
    <ul className="flex flex-col">
      {courseDetail.units!.map((unit, index) => {
        if (index === 0) {
          return (
            <li key={unit.id} className="relative w-full">
              <PracticeCatalogueItem
                unit={unit}
                // isLock={false}
                index={index}
                courseDetail={courseDetail}
              ></PracticeCatalogueItem>
            </li>
          );
        }
        return (
          <>
            <hr className="my-5"></hr>
            <li key={unit.id} className="relative w-full">
              <PracticeCatalogueItem
                unit={unit}
                // isLock={
                //   courseDetail.units![index - 1].progress < 1 ||
                //   unit.progress === undefined
                // }
                index={index}
                courseDetail={courseDetail}
              ></PracticeCatalogueItem>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default CourseCatalogue;
