import React from 'react';

interface FilterTrackProp {
  tracks: string[];
  trackClick: (track: string) => void;
  filterTracks: string[];
}

const FilterTrack: React.FC<FilterTrackProp> = ({ trackClick, tracks, filterTracks }) => {
  return (
    <div className=" container mx-auto mt-[32px] ">
      <div className="no-scrollbar flex h-[46px] gap-[12px] overflow-auto ">
        {filterTracks.map((v) => (
          <div
            key={v}
            onClick={() => trackClick(v)}
            className={`flex-center body-m h-full cursor-pointer whitespace-nowrap rounded-[24px] border px-[20px]  ${~tracks.indexOf(v) ? 'border-yellow-light bg-yellow-light text-neutral-black' : 'border-neutral-light-gray bg-neutral-off-white text-neutral-medium-gray'}`}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTrack;
