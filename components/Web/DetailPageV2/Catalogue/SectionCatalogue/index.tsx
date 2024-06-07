import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC } from 'react';
import SectionCatalogueItem from './SectionCatalogueItem';

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
        if (section.courses.every((item) => !item)) return;
        if (index === 0) {
          return (
            <li key={index} className="relative w-full">
              <SectionCatalogueItem
                section={section}
                index={index}
                learningTrackDetail={learningTrackDetail}
              ></SectionCatalogueItem>
            </li>
          );
        }
        return (
          <li key={index} className="relative w-full">
            <hr className="my-4"></hr>
            <SectionCatalogueItem
              section={section}
              index={index}
              learningTrackDetail={learningTrackDetail}
            ></SectionCatalogueItem>
          </li>
        );
      })}
    </ul>
  );
};

export default LearningTrackCatalogue;
