import Button from '@/components/v2/Common/Button';
import React, { useContext, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { ProfileContext } from '../../type';
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
        className="h-[63px] rounded-[10px] border-[0.5px] border-dashed border-[#8C8C8C] text-[#8c8c8c] flex items-center justify-center gap-[5px] cursor-pointer"
      >
        <IoIosAddCircle size={24} />
        <span>Add new experience</span>
      </div>
      <div className="max-h-[60vh] overflow-auto my-[20px]">
        <div>
          {list.map((v, i) => (
            <div
              key={i}
              className="border-b-[0.5px] border-b-[#000] py-[20px] flex"
            >
              <div className="w-[270px] font-next-book text-[17px] text-[#8C8C8C]">
                <p>
                  {dealDate(v.startDate)} -{' '}
                  {v.endDate ? dealDate(v.endDate) : 'Present'} ·{' '}
                  {dateInterval(v.startDate, v.endDate)}
                </p>
                <p>{v.location}</p>
              </div>
              <div className="flex-1 text-[#000] ml-[35px] mr-[20px]">
                <div className="w-full break-all">
                  <span className="text-[21px] font-next-poster-Bold">
                    {v.title}
                  </span>
                  <span>{` · `}</span>
                  <span className="font-next-book text-[18px] ">
                    {v.companyName} · {v.employmentType}
                  </span>
                </div>
                <div>
                  {v.descriptions.map((d, j) => (
                    <div className="flex items-start" key={j}>
                      <span className="w-[5px] h-[5px] rounded-[50%] bg-[#000] relative top-[11px] mr-[7px]"></span>
                      <span className="break-all flex-1 leading-[26px]">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-[30px] relative top-[2px]">
                <FiEdit3
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleEdit(v.id)}
                />
                <FiTrash2
                  onClick={() => openDeleteConfirm(v.id)}
                  size={20}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-[15px]">
        <Button
          onClick={onClose}
          className="w-[265px] h-[44px] border border-[#0b0b0b]  text-[#0b0b0b] text-[16px]"
        >
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
