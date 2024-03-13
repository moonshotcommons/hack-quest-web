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
  refreshUnit: VoidFunction;
}

const DropLesson: React.FC<DropLessonProp> = ({
  unitList,
  children,
  unitIndex,
  lessonIndex: targetIndex,
  changeUnitList,
  refreshUnit
}) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: unitList[unitIndex].pages?.map((v) => v.id),
      drop: (item: LessonMenuType) => {
        const newUnitList = cloneDeep(unitList);
        const curIndex = unitList[unitIndex].pages.findIndex(
          (v) => v.id === item.id
        );
        newUnitList[unitIndex].pages.splice(curIndex, 1);
        newUnitList[unitIndex].pages.splice(
          targetIndex,
          0,
          unitList[unitIndex].pages[curIndex]
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
