import Modal from '@/components/Common/Modal';
import React, { useContext, useEffect, useState } from 'react';
import { FiX, FiChevronLeft } from 'react-icons/fi';
import List from './List';
import EditAdd from './EditAdd';
import { ListDataType } from '..';
import { UserExperienceType } from '@/service/webApi/user/type';
import { ProfileContext } from '../../../constants/type';
import { BurialPoint } from '@/helper/burialPoint';

interface EditProp {
  open: boolean;
  list: ListDataType[];
  onClose: VoidFunction;
}

export enum EditType {}

const Edit: React.FC<EditProp> = ({ open, onClose, list }) => {
  const [status, setStatus] = useState('list');
  const [editType, setEditType] = useState<'add' | 'edit'>('add');
  const [editEx, setEditEx] = useState<UserExperienceType>();
  const { refresh } = useContext(ProfileContext);
  const handleEdit = (id?: string) => {
    BurialPoint.track(`user-profile Experenice Modal ${id ? 'Edit' : 'Add'} icon按钮点击`);
    if (id) {
      const ex = list.find((v) => v.id === id) || {};
      setEditEx(ex as UserExperienceType);
      setEditType('edit');
    } else {
      setEditEx({} as UserExperienceType);
      setEditType('add');
    }
    setStatus('edit');
  };

  useEffect(() => {
    open && setStatus('list');
  }, [open]);
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="w-[1000px] rounded-[10px] bg-neutral-white p-[30px]">
        <div className="text-h3 mb-[20px] flex items-center">
          {status === 'edit' ? (
            <div className="flex cursor-pointer items-center " onClick={() => setStatus('list')}>
              <FiChevronLeft />
              <span>Experience</span>
            </div>
          ) : (
            <span>Experience</span>
          )}
        </div>
        {status === 'list' ? (
          <List list={list} onClose={onClose} handleEdit={handleEdit} />
        ) : (
          <EditAdd editEx={editEx} editType={editType} onCancel={() => setStatus('list')} onRefresh={refresh} />
        )}
      </div>
    </Modal>
  );
};

export default Edit;
