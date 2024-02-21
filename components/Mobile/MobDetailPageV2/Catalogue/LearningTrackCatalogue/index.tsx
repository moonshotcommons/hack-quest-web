import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC } from 'react';
import LearningTrackCatalogueItem from './LearningTrackCatalogueItem';

interface LearningTrackCatalogueProps {
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackCatalogue: FC<LearningTrackCatalogueProps> = (props) => {
  const { learningTrackDetail } = props;

  const sectionList = learningTrackDetail.sections;

  if (!sectionList?.length) return null;

  return (
    <ul className="">
      {sectionList.map((section, index) => {
        if (index === 0) {
          return (
            <li key={index} className="relative w-full">
              <LearningTrackCatalogueItem
                section={section}
                index={index}
                learningTrackDetail={learningTrackDetail}
              ></LearningTrackCatalogueItem>
            </li>
          );
        }
        return (
          <li key={index} className="relative w-full">
            <hr className="my-5 "></hr>
            <LearningTrackCatalogueItem
              section={section}
              index={index}
              learningTrackDetail={learningTrackDetail}
            ></LearningTrackCatalogueItem>
          </li>
        );
      })}
    </ul>
  );
};

export default LearningTrackCatalogue;
