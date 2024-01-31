import Button from '@/components/Common/Button';
import React from 'react';

interface AddProp {
  addText: string;
  buttonText: string;
  handleClick: VoidFunction;
}

const Add: React.FC<AddProp> = ({ addText, buttonText, handleClick }) => {
  return (
    <div className="flex flex-col items-center p-[46px] font-next-book">
      <p className="mb-[24px] text-[18px] text-neutral-black">{addText}</p>
      <Button
        className="h-[44px] w-[265px] bg-yellow-primary  p-0 text-[16px]"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Add;
