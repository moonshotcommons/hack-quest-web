import React, { useState } from 'react';
import { distributionTabData, variousChartTypeData } from '../../../../../constants/data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

interface VariousProp {}

const Various: React.FC<VariousProp> = () => {
  const [variousData, setVariousData] = useState(
    distributionTabData.map((v) => ({
      ...v,
      type: 'pie'
    }))
  );
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="text-h35 text-neutral-off-black">UTM Sources</div>
      <div className="flex items-stretch gap-[20px]">
        {variousData.map((v, i) => (
          <div
            className="body-s flex flex-1 flex-shrink-0 flex-col gap-[20px] rounded-[16px] border border-neutral-light-gray p-[15px] text-neutral-rich-gray"
            key={v.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[4px]">
                {v.icon}
                <span>{v.label}</span>
              </div>
              <SlideHighlight
                className={`flex rounded-[4px] bg-neutral-light-gray text-neutral-medium-gray`}
                type="VARIOUS_ECHARTS_TAB"
                currentIndex={variousChartTypeData.findIndex((c) => c.value === v.type)}
              >
                {variousChartTypeData.map((tab) => (
                  <div
                    key={tab.value}
                    onClick={() => {
                      const newTab = {
                        ...v,
                        type: tab.value
                      };
                      variousData[i] = newTab;
                      setVariousData([...variousData]);
                    }}
                    className={`relative flex cursor-pointer items-center gap-[4px] rounded-[8px] px-[8px] py-[4px] ${v.type === tab.value && 'text-neutral-off-black'}`}
                  >
                    {tab.icon}
                  </div>
                ))}
              </SlideHighlight>
            </div>
            <div></div>
            <div className="caption-10pt flex flex-wrap justify-center gap-[8px] text-neutral-rich-gray">
              <div className="flex items-center gap-[2px] ">
                <div className="h-[12px] w-[12px] rounded-[2px]" style={{ backgroundColor: 'red' }}></div>
                <span>15%</span>
              </div>
              <div className="flex items-center gap-[2px] ">
                <div className="h-[12px] w-[12px] rounded-[2px]" style={{ backgroundColor: 'red' }}></div>
                <span>15%</span>
              </div>
              <div className="flex items-center gap-[2px] ">
                <div className="h-[12px] w-[12px] rounded-[2px]" style={{ backgroundColor: 'red' }}></div>
                <span>15%</span>
              </div>
              <div className="flex items-center gap-[2px] ">
                <div className="h-[12px] w-[12px] rounded-[2px]" style={{ backgroundColor: 'red' }}></div>
                <span>15%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Various;
