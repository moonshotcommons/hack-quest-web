import React from 'react';
import EditBox from '../EditBox';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';

interface PartnersBoxProp {
  type: 'partners' | 'mediaPartners' | 'communityPartners';
  hackathon: HackathonType;
}

const PartnersBox: React.FC<PartnersBoxProp> = ({ type, hackathon }) => {
  return (
    <EditBox title={`hackathonDetail.${type}`}>
      <div className="body-s-bold flex flex-wrap gap-[20px] text-neutral-off-black">
        {hackathon[type]?.map((v, i) => (
          <div
            className="flex h-[56px] w-[calc((100%-60px)/4)] flex-shrink-0 items-center gap-[5px] overflow-hidden rounded-[80px] border border-neutral-medium-gray bg-neutral-white p-[5px]"
            key={i}
          >
            <BaseImage src={v.picture} alt={v.name} className="h-[46px] w-[46px] flex-shrink-0 rounded-[50%]" />
            <span className="w-0 flex-1 truncate pr-[5px]">{v.name}</span>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default PartnersBox;
