import webApi from '@/service';
import {
  CompleteStateType,
  CourseLessonType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

const formateDropdownData = (
  data: UnitPagesListType[],
  lesson: CourseLessonType
) => {
  let currentUnitIndex = data.findIndex((unit) => unit.id === lesson.unitId);
  // let currentLessonIndex = data[currentUnitIndex].pages.findIndex(
  //   (page) => page.id === lesson.id
  // );
  let prevUnitProgress = 1;
  const newData: UnitPagesListType[] = data.map((unit, index) => {
    let prevLessonState = CompleteStateType.COMPLETED;
    const newUnit = {
      ...unit,
      disable: !unit.progress && prevUnitProgress < 1,
      pages: unit.pages?.map((page, pageIndex) => {
        const newPage = {
          ...page,
          disable:
            page.state === CompleteStateType.NOT_STARTED &&
            prevLessonState !== CompleteStateType.COMPLETED
        };
        prevLessonState = page.state;
        return newPage;
      })
    };

    prevUnitProgress = unit.progress;
    return newUnit;
  });
  return {
    newData,
    currentUnitIndex
  };
};

export const useUnitNavList = (lesson: CourseLessonType) => {
  const [unitNavList, setUnitNavList] = useState<UnitPagesListType[]>();
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const setUnitsLessonsList = useCourseStore(
    (state) => state.setUnitsLessonsList
  );

  const { run, refresh } = useRequest(
    async () => {
      debugger;
      const data = await webApi.courseApi.getCourseUnitsAndPages(
        lesson?.courseId
      );
      if (data) {
        const formateData = formateDropdownData(data, lesson!);
        const newData = formateData.newData;
        setCurrentUnitIndex(formateData.currentUnitIndex);
        setUnitsLessonsList(data);
        setUnitNavList(newData);
      }
    },
    { manual: true }
  );

  useEffect(() => {
    if (lesson && !unitNavList && lesson.courseId) {
      run();
    }
  }, [lesson, run]);

  return { unitNavList, currentUnitIndex, refreshNavList: refresh };
};
