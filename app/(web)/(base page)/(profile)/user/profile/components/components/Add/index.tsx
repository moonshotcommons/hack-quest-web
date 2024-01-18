import Button from '@/components/Common/Button';
import React from 'react';

interface AddProp {
  addText: string;
  buttonText: string;
  handleClick: VoidFunction;
}

const Add: React.FC<AddProp> = ({ addText, buttonText, handleClick }) => {
  return (
    <div className="flex flex-col items-center font-next-book p-[46px]">
      <p className="text-[#000] text-[18px] mb-[24px]">{addText}</p>
      <Button
        className="w-[265px] h-[44px] bg-yellow-primary  text-[16px] p-0"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Add;
