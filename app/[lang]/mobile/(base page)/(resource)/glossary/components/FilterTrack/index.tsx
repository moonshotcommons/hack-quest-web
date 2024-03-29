import { glossaryTracks } from '@/app/[lang]/(web)/(base page)/(resource)/glossary/constants/data';
import React from 'react';

interface FilterTrackProp {
  tracks: string[];
  trackClick: (track: string) => void;
}

const FilterTrack: React.FC<FilterTrackProp> = ({ trackClick, tracks }) => {
  return (
    <div className="no-scrollbar mb-[2.25rem] mt-[1.75rem] flex gap-[.5rem] overflow-x-auto px-[1.25rem]">
      {glossaryTracks.map((v) => (
        <div
          key={v.value}
          onClick={() => trackClick(v.value)}
          className={`flex-center body-s h-[2.5rem] w-[6.25rem] flex-shrink-0  rounded-[24px] border  ${~tracks.indexOf(v.value) ? 'border-yellow-light bg-yellow-light text-neutral-black' : 'border-neutral-light-gray text-neutral-medium-gray'}`}
        >
          {v.label}
        </div>
      ))}
    </div>
  );
};

export default FilterTrack;
