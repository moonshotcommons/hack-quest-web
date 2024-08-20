import React, { useEffect, useState } from 'react';
import { distributionTabData, growthOptions } from '../../../../../constants/data';
import { DistributionTab } from '../../../../../constants/type';
import { MultiSelect } from '../../../../../components/MultiSelect';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

interface GrowthProp {}

const Growth: React.FC<GrowthProp> = () => {
  const [curTab, setCurTab] = useState<DistributionTab>(distributionTabData[0].id);
  const [curKind, setCurKind] = useState(growthOptions[0].value);
  useEffect(() => {}, [curTab]);
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="text-h35 text-neutral-off-black">Growth</div>
      <div className="flex justify-between gap-[40px]">
        <SlideHighlight
          className={`body-s flex text-neutral-rich-gray`}
          type="GROWTH_TAB"
          currentIndex={distributionTabData.findIndex((v) => v.id === curTab)}
        >
          {distributionTabData.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setCurTab(tab.id)}
              className={`relative flex cursor-pointer items-center gap-[4px] rounded-[8px] px-[12px] py-[4px] ${curTab === tab.id && 'text-neutral-off-black'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          ))}
        </SlideHighlight>
        <MultiSelect
          type="radio"
          value={curKind}
          options={growthOptions}
          onSelect={(sec) => {
            setCurKind(sec as string);
          }}
        />
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default Growth;
