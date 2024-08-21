import React, { useCallback, useState } from 'react';
import { distributionTabData, variousChartTypeData } from '../../../../../constants/data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { SourceEchartPie, SourceEchartBar } from '../DistributionEcharts';

interface VariousProp {}

const Various: React.FC<VariousProp> = () => {
  const [variousData, setVariousData] = useState(
    distributionTabData.map((v) => ({
      ...v,
      type: 'pie',
      typeIndex: 0
    }))
  );
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="text-h35 text-neutral-off-black">UTM Sources</div>
      <div className="flex w-full items-stretch gap-[20px] ">
        {variousData.map((v, i) => (
          <div
            className="body-s flex flex-1 flex-shrink-0 flex-col  rounded-[16px] border border-neutral-light-gray p-[15px] text-neutral-rich-gray"
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
            {v.type === 'pie' ? (
              <div className="flex flex-col">
                <div className="relative h-0 w-full pt-[100%]">
                  <div className="absolute left-0 top-0 h-full w-full">
                    <SourceEchartPie />
                  </div>
                </div>
                <div className="caption-10pt flex flex-wrap justify-center gap-[8px] text-neutral-rich-gray">
                  {[1, 2, 3].map((_, i) => (
                    <div className="flex items-center gap-[2px] " key={i}>
                      <div className="h-[12px] w-[12px] rounded-[2px]" style={{ backgroundColor: 'red' }}></div>
                      <span>15%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="relative h-0 w-full pt-[100%]">
                  <div className="absolute left-0 top-0 h-full w-full">
                    <SourceEchartBar />
                  </div>
                </div>
                <div className="caption-10pt flex items-center justify-center gap-[8px] text-neutral-rich-gray">
                  <span>{`Total ${v.label}`}</span>
                  <span className="body-s-bold text-neutral-off-black">{180}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Various;
