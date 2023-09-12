import {
  LearningTrackDetailType,
  SectionType
} from '@/service/webApi/learningTrack/type';
import { FC, useEffect, useMemo, useState } from 'react';
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

  const a = useMemo;

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
                learningSectionIndex={learningSectionIndex}
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
              learningSectionIndex={learningSectionIndex}
            ></SectionCard>
          </li>
        );
      })}
    </ul>
  );
};

export default TrackList;
