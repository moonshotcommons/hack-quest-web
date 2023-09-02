import webApi from '@/service';
import {
  CompleteStateType,
  CourseLessonType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

export const useUnitNavList = (lesson: CourseLessonType) => {
  const [unitNavList, setUnitNavList] = useState<UnitPagesListType[]>();
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const dispatch = useDispatch();

  const { run, refresh } = useRequest(
    async () => {
      const data = await webApi.courseApi.getCourseUnitsAndPages(
        lesson!.courseId
      );
      if (data) {
        const formateData = formateDropdownData(data, lesson!);
        const newData = formateData.newData;
        setCurrentUnitIndex(formateData.currentUnitIndex);
        dispatch(setUnitsLessonsList(data));
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
