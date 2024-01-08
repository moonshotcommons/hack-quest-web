import Button from '@/components/Common/Button';
import React from 'react';

interface NoDataProp {
  onClick: VoidFunction;
}

const NoData: React.FC<NoDataProp> = ({ onClick }) => {
  return (
    <div className="flex flex-col gap-[40px] items-center">
      <p className="body-xl text-neutral-medium-gray">
        There is no content yet~
      </p>
      <Button
        className="w-[270px] h-[60px] border border-neutral-black text-neutral-black button-text-l"
        onClick={onClick}
      >
        BACK TO ALL BLOGS
      </Button>
    </div>
  );
};

export default NoData;
