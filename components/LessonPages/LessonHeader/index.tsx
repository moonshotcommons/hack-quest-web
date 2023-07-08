import Dropdown, { ChildrenDropDown } from '@/components/Common/DropDown';
import { DropData } from '@/components/Common/DropDown/type';
import LeftArrowIcon from '@/components/Common/Icon/LeftArrow';
import webApi from '@/service';
import {
  CourseLessonType,
  CourseUnitType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import { useRequest } from 'ahooks';
import { NextRouter, useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface LessonHeaderProps {
  lesson: CourseLessonType;
}
const formateDropdownData = (
  data: UnitPagesListType[],
  lesson: CourseLessonType
) => {
  let currentUnitIndex = data.findIndex((unit) => unit.id === lesson.unitId);
  let currentLessonIndex = data[currentUnitIndex].pages.findIndex(
    (page) => page.id === lesson.id
  );

  const newData: DropData<UnitPagesListType, CourseLessonType>[] = data.map(
    (unit, index) => {
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
            disable: pageIndex > currentLessonIndex,
            type: 'page',
            render(itemData) {
              return currentLessonIndex === pageIndex ? (
                <div className="px-[0.8rem] border rounded-full w-fit border-[#D9D9D9] -ml-3">
                  {itemData.title}
                </div>
              ) : (
                <div>{itemData.title}</div>
              );
            }
          };
        })
      };
    }
  );

  return newData;
};

const LessonHeader: FC<LessonHeaderProps> = (props) => {
  const { lesson } = props;
  const router = useRouter();

  const [dropData, setDropData] = useState<
    DropData<UnitPagesListType, CourseLessonType>[]
  >([]);

  const dispatch = useDispatch();

  const { run } = useRequest(
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
    if (lesson) run();
  }, [lesson, run]);

  return (
    <div className="w-full h-full flex items-center justify-between mt-[3.375rem] gap-[4.5rem]">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[.75rem]">
          <div
            className="max-w-fit flex items-center justify-center p-2 rounded-full bg-[#000] border border-solid border-[#303030] hover:bg-[#303030] cursor-pointer"
            onClick={() => router.back()}
          >
            <LeftArrowIcon></LeftArrowIcon>
          </div>
          <div className="text-[#F2F2F2F2] font-next-poster-Bold text-2xl">
            {lesson?.name}
          </div>
        </div>

        <Dropdown<UnitPagesListType, CourseLessonType>
          defaultSelectKey={
            dropData.find((unit) => unit.key === lesson.unitId)?.key || ''
          }
          dropData={dropData}
          onSelect={(value) => {
            console.log(value.type, value);
          }}
        ></Dropdown>
      </div>
      <div className="w-full h-full bg-red-500"></div>
    </div>
  );
};

export default LessonHeader;
