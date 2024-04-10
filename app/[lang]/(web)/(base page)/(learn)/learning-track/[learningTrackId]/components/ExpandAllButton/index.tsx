'use client';
import { LangContext } from '@/components/Provider/Lang';
import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import { BurialPoint } from '@/helper/burialPoint';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FC, useContext } from 'react';

interface ExpandAllButtonProps {}

const ExpandAllButton: FC<ExpandAllButtonProps> = (props) => {
  const { expandAll, setExpandList, learningTrackDetail } = useContext(LearningTrackDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  return (
    <div
      className="underline-m cursor-pointer"
      onClick={() => {
        if (expandAll) {
          setExpandList([]);
        } else {
          setExpandList(learningTrackDetail?.sections.map((item, index) => index) || []);
        }

        BurialPoint.track('learningTrackDetail-Expand All 按钮点击');
      }}
    >
      {expandAll && t('courses.collapseAll')}
      {!expandAll && t('courses.expandAll')}
    </div>
  );
};

export default ExpandAllButton;
