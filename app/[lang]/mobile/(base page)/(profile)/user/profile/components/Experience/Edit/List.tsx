import Button from '@/components/Common/Button';
import React, { useContext, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { ProfileContext } from '../../../constants/type';
import { ListDataType } from '..';
import { dateInterval, dealDate } from '../utils';
import Confirm from '../../components/Confirm';
import webApi from '@/service';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';

interface ListProp {
  onClose: VoidFunction;
  handleEdit: (id?: string) => void;
  list: ListDataType[];
}

const List: React.FC<ListProp> = ({ onClose, handleEdit, list }) => {
  const { refresh } = useContext(ProfileContext);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(false);
  const openDeleteConfirm = (id: string) => {
    BurialPoint.track('user-profile Experenice Modal Delete icon按钮点击');
    setDeleteId(id);
    setOpen(true);
  };
  const handleDelete = () => {
    BurialPoint.track('user-profile Experenice Modal 确认删除');
    setLoading(true);
    webApi.userApi
      .deleteExperience(deleteId)
      .then(() => {
        message.success('success');
        setDeleteId('');
        setOpen(false);
        refresh();
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="">
      <div
        onClick={() => handleEdit()}
        className="flex h-[63px] cursor-pointer items-center justify-center gap-[5px] rounded-[10px] border-[0.5px] border-dashed border-neutral-medium-gray text-neutral-medium-gray"
      >
        <IoIosAddCircle size={24} />
        <span>Add new experience</span>
      </div>
      <div className="my-[20px] max-h-[60vh] overflow-auto">
        <div>
          {list.map((v, i) => (
            <div key={i} className="flex border-b-[0.5px] border-b-neutral-black py-[20px]">
              <div className="body w-[270px] text-neutral-medium-gray">
                <p>
                  {dealDate(v.startDate)} - {v.endDate ? dealDate(v.endDate) : 'Present'} ·{' '}
                  {dateInterval(v.startDate, v.endDate)}
                </p>
                <p>{v.location}</p>
              </div>
              <div className="ml-[35px] mr-[20px] flex-1 text-neutral-black">
                <div className="w-full break-all">
                  <span className="body-xl-bold">{v.title}</span>
                  <span>{` · `}</span>
                  <span className="body-l">
                    {v.companyName} · {v.employmentType}
                  </span>
                </div>
                <div>
                  {v.descriptions.map((d, j) => (
                    <div className="flex items-start" key={j}>
                      <span className="relative top-[11px] mr-[7px] h-[5px] w-[5px] rounded-[50%] bg-neutral-black"></span>
                      <span className="flex-1 break-all leading-[26px]">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative top-[2px] flex gap-[30px]">
                <FiEdit3 size={20} className="cursor-pointer" onClick={() => handleEdit(v.id)} />
                <FiTrash2 onClick={() => openDeleteConfirm(v.id)} size={20} className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-[15px]">
        <Button onClick={onClose} className="body-m h-[44px] w-[265px] border  border-neutral-black text-neutral-black">
          Close
        </Button>
      </div>

      <Confirm
        open={open}
        onClose={() => setOpen(false)}
        title="Experience"
        content="Do you want to delete this experience?"
        handleConfirm={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default List;
