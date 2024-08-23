import Button from '@/components/Common/Button';
import { CirclePlus } from 'lucide-react';
import React from 'react';

interface SourcesProp {}

const Sources: React.FC<SourcesProp> = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <div className="text-h35 text-neutral-off-black">UTM Sources</div>
        <Button
          type="primary"
          className="button-text-m h-[30px] w-[161px] p-0 uppercase  text-neutral-off-black"
          icon={<CirclePlus size={14} />}
        >
          add a source
        </Button>
      </div>
      <div className="body-s flex flex-wrap gap-[40px_20px] text-neutral-off-black">
        <div className="flex items-center gap-[8px]">
          <div
            className="h-[20px] w-[60px] rounded-[4px]"
            style={{
              backgroundColor: '#E0E0E0'
            }}
          ></div>
          <span>sdsdsd</span>
        </div>
        <div className="flex items-center gap-[8px]">
          <div
            className="h-[20px] w-[60px] rounded-[4px]"
            style={{
              backgroundColor: '#E0E0E0'
            }}
          ></div>
          <span>sdsdsd</span>
        </div>
        <div className="flex items-center gap-[8px]">
          <div
            className="h-[20px] w-[60px] rounded-[4px]"
            style={{
              backgroundColor: '#E0E0E0'
            }}
          ></div>
          <span>sdsdsd</span>
        </div>
      </div>
    </div>
  );
};

export default Sources;
