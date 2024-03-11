import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { LessonMenuType, UnitMenuType } from '../../constant/type';
import { cloneDeep } from 'lodash-es';

interface DropLessonProp {
  unitList: UnitMenuType[];
  children: ReactNode;
  unitIndex: number;
  lessonIndex: number;
  changeUnitList: (list: UnitMenuType[]) => void;
}

const DropLesson: React.FC<DropLessonProp> = ({
  unitList,
  children,
  unitIndex,
  lessonIndex: targetIndex,
  changeUnitList
}) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: unitList[unitIndex].lesson?.map((v) => v.id),
      drop: (item: LessonMenuType) => {
        const newUnitList = cloneDeep(unitList);
        const curIndex = unitList[unitIndex].lesson.findIndex(
          (v) => v.id === item.id
        );
        newUnitList[unitIndex].lesson.splice(curIndex, 1);
        newUnitList[unitIndex].lesson.splice(
          targetIndex,
          0,
          unitList[unitIndex].lesson[curIndex]
        );
        changeUnitList(newUnitList);
      },
      collect: () => ({})
    }),
    [unitList]
  );
  return <div ref={drop}>{children}</div>;
};

export default DropLesson;
