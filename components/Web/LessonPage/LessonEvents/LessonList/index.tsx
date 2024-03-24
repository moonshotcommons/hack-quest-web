import { BurialPoint } from '@/helper/burialPoint';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import ArrowLeft from '@/public/images/lesson/arrow_left_line.svg';
import Complete from '@/public/images/lesson/complete.svg';
import CompleteActive from '@/public/images/lesson/complete_active.svg';
import {
  CompleteStateType,
  CourseLessonStateType,
  CourseLessonType,
  CourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface LessonListType {
  unitData: UnitPagesListType[];
  lesson: CourseLessonType;
  courseType: CourseType;
  changeToggle: (toggle: boolean) => void;
}
const LessonList: React.FC<LessonListType> = ({
  unitData,
  lesson,
  courseType,
  changeToggle
}) => {
  const [lessonList, setLessonList] = useState<CourseLessonStateType[]>([]);

  const [unitName, setUnitName] = useState('');
  const { redirectToUrl } = useRedirect();
  const { getLink } = useGetLessonLink();

  const getChildren = (item: UnitPagesListType) => {
    if (!item || item?.disable || !item?.pages) return;
    setLessonList(item.pages as CourseLessonStateType[]);
    setUnitName(item.title);
  };

  const handleUnit = (item: CourseLessonStateType) => {
    if (item?.disable) return;
    if (lesson?.id === item?.id) {
      changeToggle(false);
      return;
    }
    const link = getLink(courseType, item?.id as string);
    BurialPoint.track('lesson-使用lesson dropdown跳转lesson');
    changeToggle(false);
    redirectToUrl(link);
  };

  useEffect(() => {
    const unit = unitData.find(
      (v) => v.id === lesson.unitId
    ) as UnitPagesListType;
    getChildren(unit);
  }, []);

  return (
    <div className="max-h-[60vh] w-full overflow-auto">
      {!unitName ? (
        unitData.map((v) => (
          <div
            key={v.id}
            className={`flex h-[54px] w-full items-center  px-5 text-[21px] tracking-[0.42px]   ${
              v.id === lesson.unitId
                ? 'bg-lesson-events-toggle-list-active-bg'
                : ''
            } ${
              !v.disable
                ? 'cursor-pointer hover:bg-lesson-events-toggle-list-active-bg'
                : 'cursor-not-allowed'
            }`}
            onClick={() => getChildren(v)}
            title={v.title}
          >
            <p className="w-full truncate">{v.title}</p>
          </div>
        ))
      ) : (
        <div className="w-full">
          <div
            className="flex h-[64px] w-full cursor-pointer items-center px-5 text-[21px] tracking-[0.42px]"
            onClick={() => setUnitName('')}
            title={unitName}
          >
            <Image src={ArrowLeft} alt="arrow-left" width={8} height={16} />
            <p className="w-[calc(100%-8px)] truncate pl-[10px]">{unitName}</p>
          </div>
          <div className="w-full">
            {lessonList.map((v) => (
              <div
                key={v.id}
                className={`flex-row-center h-[54px]  w-full justify-between px-5 ${
                  v.id === lesson.id
                    ? 'bg-lesson-events-toggle-list-active-bg'
                    : ''
                } ${
                  !v.disable
                    ? 'cursor-pointer hover:bg-lesson-events-toggle-list-active-bg'
                    : 'cursor-not-allowed'
                }`}
                title={v.title}
                onClick={() => handleUnit(v)}
              >
                <p className="body-s-bold w-[100%] truncate">{v.title}</p>
                <Image
                  src={
                    v.state === CompleteStateType.COMPLETED
                      ? CompleteActive
                      : Complete
                  }
                  alt="complete"
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonList;
