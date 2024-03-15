'use client';
import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import { BurialPoint } from '@/helper/burialPoint';
import { FC, useContext } from 'react';

interface ExpandAllButtonProps {}

const ExpandAllButton: FC<ExpandAllButtonProps> = (props) => {
  const { expandAll, setExpandList, learningTrackDetail } = useContext(
    LearningTrackDetailContext
  );

  return (
    <div
      className="underline-m cursor-pointer"
      onClick={() => {
        if (expandAll) {
          setExpandList([]);
        } else {
          setExpandList(
            learningTrackDetail?.sections.map((item, index) => index) || []
          );
        }

        BurialPoint.track('learningTrackDetail-Expand All 按钮点击');
      }}
    >
      {expandAll && 'Collapse All'}
      {!expandAll && 'Expand All'}
    </div>
  );
};

export default ExpandAllButton;
