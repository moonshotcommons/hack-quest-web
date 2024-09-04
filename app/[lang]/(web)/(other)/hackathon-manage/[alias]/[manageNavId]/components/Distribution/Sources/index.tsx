import Button from '@/components/Common/Button';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { UtmSourceType } from '@/service/webApi/resourceStation/type';

interface SourcesProp {
  handleSource: (source?: UtmSourceType) => void;
  utmSources: UtmSourceType[];
}

const Sources: React.FC<SourcesProp> = ({ handleSource, utmSources }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <div className="text-h35 text-neutral-off-black">UTM Sources</div>
        <Button
          type="primary"
          className="button-text-m h-[30px] w-[161px] p-0 uppercase  text-neutral-off-black"
          icon={<CirclePlus size={14} />}
          onClick={() => handleSource()}
        >
          add a source
        </Button>
      </div>
      <div className="body-s flex flex-wrap gap-[40px_20px] text-neutral-off-black">
        {utmSources?.map((source) => (
          <div
            className="flex cursor-pointer items-center gap-[8px]"
            key={source.id}
            onClick={() => handleSource(source)}
          >
            <div
              className="h-[20px] w-[60px] rounded-[4px]"
              style={{
                backgroundColor: source.color
              }}
            ></div>
            <span>{source.sourceName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;
