import {
  LearningTrackDetailType,
  SectionType
} from '@/service/webApi/learningTrack/type';
import { FC, useEffect, useState } from 'react';
import SectionCard from './SectionCard';

interface TrackListProps {
  trackDetail: LearningTrackDetailType;
  expandAll?: boolean;
}

const TrackList: FC<TrackListProps> = (props) => {
  const { trackDetail, expandAll = false } = props;
  const [sectionList, setSectionList] = useState<SectionType[]>([]);

  useEffect(() => {
    if (trackDetail) {
      setSectionList(trackDetail.sections);
    }
  }, [trackDetail]);

  return (
    <ul className="w-full px-10 py-10 bg-white rounded-[10px] h-fit">
      {sectionList.map((section, index) => {
        if (index === 0) {
          return (
            <li key={index} className="w-full relative ">
              <SectionCard
                section={section}
                enrolled={trackDetail.enrolled}
                index={index}
                expandAll={expandAll}
                sectionList={sectionList}
              ></SectionCard>
            </li>
          );
        }
        return (
          <li key={index} className="w-full relative top-line">
            <SectionCard
              section={section}
              enrolled={trackDetail.enrolled}
              index={index}
              expandAll={expandAll}
              sectionList={sectionList}
            ></SectionCard>
          </li>
        );
      })}
    </ul>
  );
};

export default TrackList;
