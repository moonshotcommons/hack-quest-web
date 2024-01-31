import {
  LearningTrackDetailType,
  SectionType
} from '@/service/webApi/learningTrack/type';
import { FC, useEffect, useState } from 'react';
import SectionCard from './SectionCard';

interface TrackListProps {
  trackDetail: LearningTrackDetailType;
  expandAll?: boolean;
  learningSectionIndex?: number;
}

const TrackList: FC<TrackListProps> = (props) => {
  const { trackDetail, expandAll = false, learningSectionIndex = 0 } = props;
  const [sectionList, setSectionList] = useState<SectionType[]>([]);

  useEffect(() => {
    if (trackDetail) {
      setSectionList(trackDetail.sections);
    }
  }, [trackDetail]);

  return (
    <ul className="h-fit w-full rounded-[10px] bg-neutral-white px-10 py-10">
      {sectionList.map((section, index) => {
        if (index === 0) {
          return (
            <li key={index} className="relative w-full ">
              <SectionCard
                section={section}
                enrolled={trackDetail.enrolled}
                index={index}
                expandAll={expandAll}
                sectionList={sectionList}
                learningSectionIndex={learningSectionIndex}
              ></SectionCard>
            </li>
          );
        }
        return (
          <li key={index} className="top-line relative w-full">
            <SectionCard
              section={section}
              enrolled={trackDetail.enrolled}
              index={index}
              expandAll={expandAll}
              sectionList={sectionList}
              learningSectionIndex={learningSectionIndex}
            ></SectionCard>
          </li>
        );
      })}
    </ul>
  );
};

export default TrackList;
