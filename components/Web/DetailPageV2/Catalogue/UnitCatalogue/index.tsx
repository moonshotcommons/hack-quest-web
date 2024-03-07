import { CourseDetailType, CourseType } from '@/service/webApi/course/type';
import { FC } from 'react';
import UnitCatalogueItem from './UnitCatalogueItem';

interface CourseCatalogueProps {
  courseDetail: CourseDetailType;
}

const CourseCatalogue: FC<CourseCatalogueProps> = (props) => {
  const { courseDetail } = props;

  let list = courseDetail.units;

  if ([CourseType.MINI].includes(courseDetail.type)) {
    list = [];
    console.log(courseDetail);
  }

  return (
    <ul className="flex flex-col">
      {courseDetail.units!.map((unit, index) => {
        if (index === 0) {
          return (
            <li key={unit.id} className="relative w-full">
              <UnitCatalogueItem
                unit={unit}
                // isLock={false}
                index={index}
                courseDetail={courseDetail}
              ></UnitCatalogueItem>
            </li>
          );
        }
        return (
          <li key={unit.id}>
            <hr className="my-4"></hr>
            <div className="relative w-full">
              <UnitCatalogueItem
                unit={unit}
                // isLock={
                //   courseDetail.units![index - 1].progress < 1 ||
                //   unit.progress === undefined
                // }
                index={index}
                courseDetail={courseDetail}
              ></UnitCatalogueItem>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseCatalogue;
