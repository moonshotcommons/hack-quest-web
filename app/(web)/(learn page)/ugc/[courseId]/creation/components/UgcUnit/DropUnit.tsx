import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { UnitMenuType } from '../../constant/type';
import { cloneDeep } from 'lodash-es';

interface DropUnitProp {
  unitList: UnitMenuType[];
  children: ReactNode;
  index: number;
  changeUnitList: (list: UnitMenuType[]) => void;
  refreshUnit: VoidFunction;
}

const DropUnit: React.FC<DropUnitProp> = ({
  unitList,
  children,
  changeUnitList,
  index: targetIndex,
  refreshUnit
}) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: unitList.map((v) => v.id),
      drop: (item: UnitMenuType) => {
        const curIndex = unitList.findIndex((v) => v.id === item.id);
        const newUnitList = cloneDeep(unitList);
        newUnitList.splice(curIndex, 1);
        newUnitList.splice(targetIndex, 0, unitList[curIndex]);
        changeUnitList(newUnitList);
      },
      collect: () => ({})
    }),
    [unitList]
  );
  return <div ref={drop}>{children}</div>;
};

export default DropUnit;
