import React, { useState } from 'react';
import { distributionTabData, growthOptions } from '../../../../../constants/data';
import { DistributionTab, GrowthOptionValue } from '../../../../../constants/type';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/user-profile/common/select';
import { GrowthEchartline } from '../DistributionEcharts';
import Loading from '@/components/Common/Loading';
import { GrowthDataType, GrowthType } from '@/service/webApi/resourceStation/type';

interface GrowthProp {
  growthData: GrowthDataType;
  isLoading: boolean;
  curKind: GrowthOptionValue;
  setCurKind: (kind: GrowthOptionValue) => void;
}

const Growth: React.FC<GrowthProp> = ({ growthData, isLoading, curKind, setCurKind }) => {
  const [curTab, setCurTab] = useState<DistributionTab>(distributionTabData[0].id);

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
        <Select onValueChange={(value) => setCurKind(value as GrowthOptionValue)} value={curKind}>
          <SelectTrigger className="body-s w-[128px] rounded-[32px]">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            {growthOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Loading loading={isLoading}>
          <GrowthEchartline data={growthData?.[curTab] as GrowthType[]} curTab={curTab} />
        </Loading>
      </div>
    </div>
  );
};

export default Growth;
