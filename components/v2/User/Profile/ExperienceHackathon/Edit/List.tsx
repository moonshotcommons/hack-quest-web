import Button from '@/components/v2/Common/Button';
import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

interface ListProp {
  onClose: VoidFunction;
  handleEdit: (info?: any) => void;
}

const List: React.FC<ListProp> = ({ onClose, handleEdit }) => {
  const handleDelete = () => {};
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
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border-b-[0.5px] border-b-[#000] py-[20px] flex"
            >
              <div className="w-[240px] font-next-book text-[18px] text-[#8C8C8C]">
                Jul 2022 - Present · 1 yr 5 mos California, United States
              </div>
              <div className="flex-1 text-[#000] ml-[35px] mr-[20px]">
                <div className="w-full break-all">
                  <span className="text-[21px] font-next-poster-Bold">
                    Software Development Engineer
                  </span>
                  <span>{` · `}</span>
                  <span className="font-next-book text-[18px] ">
                    Amazon · Full-time
                  </span>
                </div>
                <div>
                  <div className="flex items-start">
                    <span className="w-[5px] h-[5px] rounded-[50%] bg-[#000] relative top-[11px] mr-[7px]"></span>
                    <span className="break-all flex-1 leading-[26px]">
                      Designed a commuter-based idea for delivering packages on
                      top of current delivery system(Amazon Flex).Designed a
                      commuter-based
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-[30px] relative top-[2px]">
                <FiEdit3
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleEdit()}
                />
                <FiTrash2
                  onClick={() => handleDelete()}
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
          Cancel
        </Button>
        <Button className="w-[265px] h-[44px] bg-[#ffd850]    text-[16px]">
          Save
        </Button>
      </div>
    </div>
  );
};

export default List;
