import { getCourseLink } from '@/helper/utils';
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
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
interface LessonListType {
  unitData: UnitPagesListType[];
  lesson: CourseLessonType;
  courseType: CourseType;
}
const LessonList: React.FC<LessonListType> = ({
  unitData,
  lesson,
  courseType
}) => {
  const [lessonList, setLessonList] = useState<CourseLessonStateType[]>([]);
  const [unitName, setUnitName] = useState('');
  const router = useRouter();
  const getChildren = (item: UnitPagesListType) => {
    if (item.disable) return;
    setLessonList(item.pages as CourseLessonStateType[]);
    setUnitName(item.name);
  };

  const handleUnit = (item: CourseLessonStateType) => {
    if (item.disable) return;
    router.push(
      `/${getCourseLink(courseType)}/${router.query.courseId}/learn/${item.id}`
    );
  };

  useEffect(() => {
    const unit = unitData.find(
      (v) => v.id === lesson.unitId
    ) as UnitPagesListType;
    getChildren(unit);
  }, []);
  return (
    <div className="h-full w-full font-next-book">
      {!unitName ? (
        unitData.map((v) => (
          <div
            key={v.id}
            className={`h-[54px] px-5 text-[21px] w-full  flex items-center tracking-[0.42px]   ${
              v.id === lesson.unitId
                ? 'bg-lesson-events-toggle-list-active-bg'
                : ''
            } ${
              !v.disable
                ? 'cursor-pointer hover:bg-lesson-events-toggle-list-active-bg'
                : 'cursor-not-allowed'
            }`}
            onClick={() => getChildren(v)}
            title={v.name}
          >
            <p className="w-full truncate">{v.name}</p>
          </div>
        ))
      ) : (
        <div className="w-full">
          <div
            className="flex items-center w-full text-[21px] tracking-[0.42px] h-[64px] px-5 cursor-pointer"
            onClick={() => setUnitName('')}
            title={unitName}
          >
            <Image src={ArrowLeft} alt="arrow-left" width={8} height={16} />
            <p className="pl-[10px] truncate w-[calc(100%-8px)]">{unitName}</p>
          </div>
          <div className="w-full">
            {lessonList.map((v) => (
              <div
                key={v.id}
                className={`h-[54px] w-full  flex-row-center justify-between px-5 hover:bg-lesson-events-toggle-list-active-bg ${
                  v.id === lesson.id
                    ? 'bg-lesson-events-toggle-list-active-bg'
                    : ''
                } ${
                  !v.disable
                    ? 'cursor-pointer hover:bg-lesson-events-toggle-list-active-bg'
                    : 'cursor-not-allowed'
                }`}
                title={v.name}
                onClick={() => handleUnit(v)}
              >
                <p className="font-next-book-bold text-[14px] w-[100%] truncate">
                  {v.name}
                </p>
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
