import React from 'react';
import { glossaryTracks } from '../../constants/data';

interface FilterTrackProp {
  tracks: string[];
  trackClick: (track: string) => void;
}

const FilterTrack: React.FC<FilterTrackProp> = ({ trackClick, tracks }) => {
  return (
    <div className="container mx-auto mb-[60px] mt-[32px] flex gap-[12px]">
      {glossaryTracks.map((v) => (
        <div
          key={v.value}
          onClick={() => trackClick(v.value)}
          className={`flex-center bpdy-m h-[46px] w-[124px] cursor-pointer rounded-[24px] border  ${~tracks.indexOf(v.value) ? 'border-yellow-light bg-yellow-light text-neutral-black' : 'border-neutral-light-gray text-neutral-medium-gray'}`}
        >
          {v.label}
        </div>
      ))}
    </div>
  );
};

export default FilterTrack;
