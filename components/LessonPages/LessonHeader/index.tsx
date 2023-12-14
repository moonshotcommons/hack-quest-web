import Dropdown from '@/components/Common/DropDown';
import { DropData } from '@/components/Common/DropDown/type';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import { getCourseLink } from '@/helper/utils';
import webApi from '@/service';
import {
  CompleteStateType,
  CourseLessonStateType,
  CourseLessonType,
  CourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface LessonHeaderProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isBetween?: boolean;
}
const formateDropdownData = (
  data: UnitPagesListType[],
  lesson: CourseLessonType
) => {
  let currentUnitIndex = data.findIndex((unit) => unit.id === lesson.unitId);
  let currentLessonIndex = data[currentUnitIndex].pages.findIndex(
    (page) => page.id === lesson.id
  );

  const newData: DropData<UnitPagesListType, CourseLessonStateType>[] =
    data.map((unit, index) => {
      return {
        key: unit.id,
        data: unit,
        title: unit.name,
        disable: index > currentUnitIndex,
        type: 'unit',
        children: unit.pages.map((page, pageIndex) => {
          return {
            key: page.id,
            title: page.name,
            data: page,
            disable:
              page.state === CompleteStateType.NOT_STARTED &&
              currentLessonIndex !== pageIndex,
            type: 'page',
            render(itemData) {
              return currentLessonIndex === pageIndex ? (
                <div className="px-[0.8rem] border rounded-full w-fit border-lesson-dropdown-select-border-color py-1 bg-lesson-dropdown-select-bg text-lesson-dropdown-select-text-color -ml-3">
                  {itemData.title}
                </div>
              ) : (
                <div>{itemData.title}</div>
              );
            }
          };
        })
      };
    });

  return newData;
};

const LessonHeader: FC<LessonHeaderProps> = (props) => {
  const { lesson, courseType, isBetween = false } = props;
  const router = useRouter();

  const [dropData, setDropData] = useState<
    DropData<UnitPagesListType, CourseLessonStateType>[]
  >([]);

  const dispatch = useDispatch();

  const { run, refresh } = useRequest(
    async () => {
      const data = await webApi.courseApi.getCourseUnitsAndPages(
        lesson.courseId
      );
      if (data) {
        const newData = formateDropdownData(data, lesson);
        dispatch(setUnitsLessonsList(data));
        setDropData(newData);
      }
    },
    { manual: true }
  );

  useEffect(() => {
    if (lesson) {
      run();
    }
  }, [lesson, run]);

  return (
    <div className="w-full h-full flex justify-between items-center mt-[3.375rem] gap-[4.5rem]">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[.75rem]">
          <Link
            href={`${getCourseLink(courseType)}/${lesson?.courseId}`}
            className="max-w-fit flex items-center justify-center p-2 rounded-full bg-lesson-header-back-button-bg
             border border-solid border-lesson-header-back-button-border-color hover:bg-lesson-header-back-button-hover-bg cursor-pointer
             text-lesson-header-back-icon-color
             hover:text-lesson-header-back-icon-hover-color
             "
          >
            <LeftArrowIcon color="currentColor"></LeftArrowIcon>
          </Link>
          <div className="text-text-default-color font-next-poster-Bold text-2xl">
            {lesson?.name}
          </div>
        </div>

        <Dropdown<UnitPagesListType, CourseLessonStateType>
          defaultSelectKey={
            dropData.find((unit) => unit.key === lesson.unitId)?.key || ''
          }
          dropData={dropData}
          onSelect={(value) => {
            if (value.type === 'page') {
              router.push(
                `${getCourseLink(courseType)}/${router.query.courseId}/learn/${
                  value.key
                }`
              );
            }
          }}
        ></Dropdown>
      </div>
      {!isBetween && <div className="w-full h-full"></div>}
    </div>
  );
};

export default LessonHeader;
