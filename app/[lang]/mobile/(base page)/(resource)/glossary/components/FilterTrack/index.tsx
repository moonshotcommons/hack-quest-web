import React from 'react';

interface FilterTrackProp {
  tracks: string[];
  trackClick: (track: string) => void;
  filterTracks: string[];
}

const FilterTrack: React.FC<FilterTrackProp> = ({ trackClick, tracks, filterTracks }) => {
  return (
    <div className="no-scrollbar flex h-[2.5rem] gap-[.5rem] overflow-x-auto px-[1.25rem]">
      {filterTracks.map((v) => (
        <div
          key={v}
          onClick={() => trackClick(v)}
          className={`flex-center body-s h-full  flex-shrink-0 whitespace-nowrap rounded-[24px]  border px-[1.25rem]  ${~tracks.indexOf(v) ? 'border-yellow-light bg-yellow-light text-neutral-black' : 'border-neutral-light-gray text-neutral-medium-gray'}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

export default FilterTrack;
