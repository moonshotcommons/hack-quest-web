import { CourseDetailType, CourseType, ProcessType, ProjectCourseType } from '@/service/webApi/course/type';
import React, { useContext } from 'react';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';

interface CourseListProp {
  list: CourseDetailType[];
  curTab: ProcessType;
}

const CourseList: React.FC<CourseListProp> = ({ list, curTab }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const card = (course: CourseDetailType) => {
    switch (course.type) {
      case CourseType.MINI:
      case CourseType.UGC:
        return (
          <ElectiveCard
            course={course as ElectiveCourseType}
            from={'dashboard'}
            inProgress={curTab === ProcessType.IN_PROCESS}
          />
        );
      case CourseType.GUIDED_PROJECT:
        return (
          <PracticeCard
            course={course as ProjectCourseType}
            from={'dashboard'}
            inProgress={curTab === ProcessType.IN_PROCESS}
          />
        );
    }
  };
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">{t('dashboard.courses')}</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((course) => (
          <div key={course.id} className="w-[calc((100%-48px)/3)]">
            {card(course)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
