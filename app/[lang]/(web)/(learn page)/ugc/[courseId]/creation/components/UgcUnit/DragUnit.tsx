import React, { useContext, useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { UgcCreateContext, UnitMenuType } from '../../constant/type';
import Unit from './Unit';
import { cloneDeep } from 'lodash-es';
import { isNull } from '@/helper/utils';
import webApi from '@/service';
import { message } from 'antd';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';

interface DragUnitProp {
  unit: UnitMenuType;
  unitList: UnitMenuType[];
  unitIndex: number;
  changeUnitList: (list: UnitMenuType[]) => void;
  handleDelete: (id: string, type: string) => void;
  showDeleteModal: (type: string, index: number) => void;
  changeDraging: (draging: boolean) => void;
  refreshUnit: VoidFunction;
}

const DragUnit: React.FC<DragUnitProp> = ({
  unit,
  unitList,
  unitIndex,
  changeUnitList,
  handleDelete,
  showDeleteModal,
  changeDraging,
  refreshUnit
}) => {
  const { courseId } = useContext(UgcCreateContext);
  const { setLoading } = useUgcCreationStore(
    useShallow((state) => ({
      setLoading: state.setLoading
    }))
  );
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
  const handleEditUnit = async (val: string) => {
    if (isNull(val) && isNull(unitList[unitIndex].title)) {
      handleDelete(unitList[unitIndex].id, 'unit');
      return;
    }

    if (isNull(unitList[unitIndex].title)) {
      //新增
      setLoading(true);
      webApi.ugcCreateApi
        .addUnit(courseId, {
          title: val,
          sequence: unitIndex
        })
        .then(() => {
          message.success('success');
          refreshUnit();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      if (isNull(val)) {
        const newUnitList = cloneDeep(unitList);
        newUnitList[unitIndex].title = unit.title;
        newUnitList[unitIndex].isInput = false;
        changeUnitList(newUnitList);
      } else {
        //编辑
        webApi.ugcCreateApi
          .editUnit(courseId, unit.id, {
            title: val,
            sequence: unitIndex
          })
          .then(() => {
            message.success('success');
            refreshUnit();
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };
  const isShowDelete = useMemo(() => {
    const otherUnits = unitList.filter((v) => v.id !== unit.id);
    let lessonCount = 0;
    otherUnits.map((unit) => {
      const len = unit.pages?.length || 0;
      lessonCount += len;
    });
    return lessonCount > 0;
  }, [unitList]);
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
        isShowDelete={isShowDelete}
      />
    </div>
  );
};

export default DragUnit;
