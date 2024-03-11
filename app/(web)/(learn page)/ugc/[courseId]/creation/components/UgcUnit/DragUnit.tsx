import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { UnitMenuType } from '../../constant/type';
import Unit from './Unit';
import { cloneDeep } from 'lodash-es';
import { isNull } from '@/helper/utils';

interface DragUnitProp {
  unit: UnitMenuType;
  unitList: UnitMenuType[];
  unitIndex: number;
  changeUnitList: (list: UnitMenuType[]) => void;
  handleDelete: (id: string, type: string) => void;
  showDeleteModal: (type: string, index: number) => void;
  changeDraging: (draging: boolean) => void;
}

const DragUnit: React.FC<DragUnitProp> = ({
  unit,
  unitList,
  unitIndex,
  changeUnitList,
  handleDelete,
  showDeleteModal,
  changeDraging
}) => {
  const [{ isDragging }, drop] = useDrag(
    () => ({
      type: unit.id,
      item: unit,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [unit]
  );
  const toggleLesson = () => {
    const newUnitList = cloneDeep(unitList);
    newUnitList[unitIndex].isToggle = !unitList[unitIndex].isToggle;
    changeUnitList(newUnitList);
  };
  const handleEditUnit = (val: string) => {
    if (isNull(val) && isNull(unitList[unitIndex].value)) {
      handleDelete(unitList[unitIndex].id, 'unit');
      console.info(2222);
      return;
    }
    const newUnitList = cloneDeep(unitList);
    newUnitList[unitIndex].value = isNull(val)
      ? newUnitList[unitIndex].value
      : val;
    newUnitList[unitIndex].isInput = false;
    changeUnitList(newUnitList);
  };
  useEffect(() => {
    changeDraging(isDragging);
  }, [isDragging]);
  return (
    <div ref={drop} className={`${isDragging ? 'opacity-5' : ''}`}>
      <Unit
        unit={unit}
        handleDelete={() => showDeleteModal('unit', unitIndex)}
        handleEdit={(val) => handleEditUnit(val)}
        handleToggle={() => toggleLesson()}
      />
    </div>
  );
};

export default DragUnit;
