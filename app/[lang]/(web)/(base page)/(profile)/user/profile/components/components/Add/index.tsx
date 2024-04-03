import Button from '@/components/Common/Button';
import React from 'react';

interface AddProp {
  addText: string;
  buttonText: string;
  handleClick: VoidFunction;
}

const Add: React.FC<AddProp> = ({ addText, buttonText, handleClick }) => {
  return (
    <div className="flex flex-col items-center p-[46px]">
      <p className="body-l mb-[24px] text-neutral-black">{addText}</p>
      <Button className="body-m h-[44px] w-[265px]  bg-yellow-primary p-0" onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default Add;
