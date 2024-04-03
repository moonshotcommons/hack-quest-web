import React from 'react';

interface FilterTrackProp {
  tracks: string[];
  trackClick: (track: string) => void;
  filterTracks: string[];
}

const FilterTrack: React.FC<FilterTrackProp> = ({ trackClick, tracks, filterTracks }) => {
  return (
    <div className="container mx-auto  mt-[32px] flex h-[46px] gap-[12px]">
      {filterTracks.map((v) => (
        <div
          key={v}
          onClick={() => trackClick(v)}
          className={`flex-center body-m h-full w-[124px] cursor-pointer rounded-[24px] border  ${~tracks.indexOf(v) ? 'border-yellow-light bg-yellow-light text-neutral-black' : 'border-neutral-light-gray text-neutral-medium-gray'}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

export default FilterTrack;
