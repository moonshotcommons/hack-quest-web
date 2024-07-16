import React, { useContext } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { customModalList } from '../../../../constants/data';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import BaseImage from '@/components/Common/BaseImage';

interface CustomModalProp {}

const CustomModal: React.FC<CustomModalProp> = () => {
  const { setModalType, setModalEditType, setEditCustomInfo } = useContext(HackathonEditContext);
  return (
    <div className="flex flex-col gap-[24px] px-[40px]">
      <div
        className="body-m flex cursor-pointer items-center gap-[6px] text-neutral-black"
        onClick={() => setModalType(HackathonEditModalType.LIST)}
      >
        <IoArrowBackOutline />
        <span>Back</span>
      </div>
      <p className="body-s text-neutral-black">Please choose a template to start:</p>
      <div className="flex items-stretch justify-between gap-[24px]">
        {customModalList.map((v) => (
          <div
            key={v.value}
            className="flex flex-1 cursor-pointer flex-col items-center gap-[16px]  rounded-[16px] border-[3px]  border-neutral-off-white bg-neutral-white p-[16px] text-neutral-black  hover:border-yellow-dark hover:bg-yellow-extra-light"
            onClick={() => {
              setModalEditType('add');
              setEditCustomInfo(null);
              setModalType(v.value);
            }}
          >
            <p className="text-h5-mob text-neutral-off-black">{v.label}</p>
            {v.value === HackathonEditModalType.CUSTOM_TEXT ? (
              <p className="caption-10pt text-neutral-rich-gray">{v.intro}</p>
            ) : (
              <BaseImage src={v.image} alt={v.label} className="h-[40px] w-full" contain={true} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomModal;
