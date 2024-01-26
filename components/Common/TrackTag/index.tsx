import { CourseTrackType } from '@/service/webApi/course/type';
import React from 'react';

interface TrackTagProp {
  track: CourseTrackType;
}

const TrackTag: React.FC<TrackTagProp> = ({ track }) => {
  return (
    <div className="caption-12pt text-neutral-rich-gray w-fit  px-[12px] py-[4px] border-[0.5px] border-neutral-rich-gray rounded-[20px] ">
      {track}
    </div>
  );
};

export default TrackTag;
