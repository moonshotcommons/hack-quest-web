import React from 'react';
import EditBox from '../EditBox';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';

interface SpeakersSponsorsBoxProp {
  type: 'speakersAndJudges' | 'sponsors';
  hackathon: HackathonType;
}

const SpeakersSponsorsBox: React.FC<SpeakersSponsorsBoxProp> = ({ type, hackathon }) => {
  return (
    <EditBox title={`hackathonDetail.${type}`}>
      <div className="body-m-bold flex flex-wrap gap-[20px] text-neutral-off-black">
        {hackathon[type]?.map((v, i) => (
          <div
            className="flex h-[81px] w-[calc((100%-20px)/2)] flex-shrink-0 items-center gap-[8px] overflow-hidden rounded-[100px] border border-neutral-light-gray bg-neutral-white p-[8px]"
            key={i}
          >
            <BaseImage src={v.avatar} alt={v.firstName} className="h-[65px] w-[65px] flex-shrink-0 rounded-[50%]" />
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-1">{v.firstName}</p>
              <p className="body-xs line-clamp-2">{v.lastName}</p>
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default SpeakersSponsorsBox;
