import React, { useState } from 'react';
import HandleDotImg from '@/public/images/ugcCreation/handle_dot.svg';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';

interface HandleDotProp {
  handleEdit: VoidFunction;
  handleDelete: VoidFunction;
  showDelete?: boolean;
}

const HandleDot: React.FC<HandleDotProp> = ({ handleEdit, handleDelete, showDelete }) => {
  const [isShowHandle, setIsShowHandle] = useState(false);
  return (
    <div className="absolute  right-[10px] top-0 z-[10] hidden text-neutral-black group-hover:block">
      <div className="relative h-[40px]" onMouseEnter={() => setIsShowHandle(true)} onMouseLeave={() => setIsShowHandle(false)}>
        <div className="text-h3 flex  h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[50%] text-neutral-medium-gray hover:bg-neutral-light-gray ">
          <Image src={HandleDotImg} alt="handle" width={14}></Image>
        </div>
        <div
          className={`body-s absolute right-0 top-[30px]  w-[134px] rounded-[10px] bg-neutral-white py-[9px] shadow-[0px_0_4px_0_rgba(0,0,0,0.12)] ${isShowHandle ? 'block' : 'hidden'}`}
        >
          <div className="flex cursor-pointer items-center gap-[12px] py-[11px] pl-[20px] hover:bg-neutral-light-gray" onClick={handleEdit}>
            <CiEdit size={20} />
            <span>Edit name</span>
          </div>
          {showDelete && (
            <div
              className="flex cursor-pointer items-center gap-[12px] py-[11px] pl-[20px] hover:bg-neutral-light-gray"
              onClick={handleDelete}
            >
              <FiTrash2 size={20} />
              <span>Delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleDot;
