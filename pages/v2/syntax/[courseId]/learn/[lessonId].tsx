// ./pages/article/[articleId].tsx

import wrapper from '@/store/redux';

import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import LessonFooter from '@/components/v2/LessonPages/LessonFooter';
import Code from '@/components/v2/LessonPages/Code';
import PreviewNav from '@/components/v2/LessonPages/PreviewNav';
import PreviewEvents from '@/components/v2/LessonPages/PreviewEvents';
import PreviewRender from '@/components/v2/LessonPages/PreviewRender';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import webApi from '@/service';
import {
  CompleteStateType,
  CourseLessonStateType,
  CourseLessonType,
  CourseType,
  CourseUnitType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { DropData } from '@/components/Common/DropDown/type';

interface IProps {}
const formateDropdownData = (
  data: UnitPagesListType[],
  lesson: CourseLessonType
) => {
  let currentUnitIndex = data.findIndex((unit) => unit.id === lesson.unitId);
  let currentLessonIndex = data[currentUnitIndex].pages.findIndex(
    (page) => page.id === lesson.id
  );
  const newData: UnitPagesListType[] = data.map((unit, index) => {
    return {
      ...unit,
      disable: index > currentUnitIndex,
      pages: unit.pages.map((page, pageIndex) => {
        return {
          ...page,
          disable:
            page.state === CompleteStateType.NOT_STARTED &&
            currentLessonIndex !== pageIndex
        };
      })
    };
  });

  return {
    newData,
    currentUnitIndex
  };
};

const SyntaxUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { lessonId } = router.query;

  const { lesson } = useGetLessonContent(lessonId as string);
  const [dropData, setDropData] = useState<UnitPagesListType[]>([]);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const dispatch = useDispatch();

  const { run, refresh } = useRequest(
    async () => {
      const data = await webApi.courseApi.getCourseUnitsAndPages(
        lesson.courseId
      );
      if (data) {
        const formateData = formateDropdownData(data, lesson);
        const newData = formateData.newData;
        setCurrentUnitIndex(formateData.currentUnitIndex);
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
    <>
      <div className="w-full h-[calc(100vh-80px)] flex flex-col font-next-book-Thin">
        <div className="flex-1 w-full flex justify-between [&>div]:w-[50%]">
          <div className="flex flex-col h-[calc(100%-10px)] pr-5">
            <PreviewNav lesson={lesson} courseType={CourseType.SYNTAX} />
            <PreviewEvents
              unitData={dropData}
              lesson={lesson}
              courseType={CourseType.SYNTAX}
            />
            <PreviewRender lesson={lesson} courseType={CourseType.SYNTAX} />
          </div>
          <div
            className="p-5 bg-lesson-code-bg h-full overflow-auto"
            style={{
              boxShadow: ' -2px 0px 4px 0px rgba(0, 0, 0, 0.10);'
            }}
          >
            <Code lesson={lesson} courseType={CourseType.SYNTAX} />
          </div>
        </div>
        <LessonFooter unitData={dropData} currentUnitIndex={currentUnitIndex} />
      </div>
    </>
  );
};

export default SyntaxUnit;
