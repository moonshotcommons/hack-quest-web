import React, { ReactNode, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { UgcCreateContext, UnitMenuType } from '../../constant/type';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
import webApi from '@/service';

interface DropUnitProp {
  unitList: UnitMenuType[];
  children: ReactNode;
  index: number;
  refreshUnit: VoidFunction;
}

const DropUnit: React.FC<DropUnitProp> = ({ unitList, children, index: targetIndex, refreshUnit }) => {
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
  const { courseId } = useContext(UgcCreateContext);
  const [{}, drop] = useDrop(
    () => ({
      accept: unitList.map((v) => v.id),
      drop: (item: UnitMenuType) => {
        const curIndex = unitList.findIndex((v) => v.id === item.id);
        setLoading(true);
        webApi.ugcCreateApi
          .sortUnit(courseId, item.id, {
            from: curIndex,
            to: targetIndex
          })
          .then(() => {
            refreshUnit();
          })
          .catch(() => {
            setLoading(false);
          });
      },
      collect: () => ({})
    }),
    [unitList]
  );
  return <div ref={drop}>{children}</div>;
};

export default DropUnit;
