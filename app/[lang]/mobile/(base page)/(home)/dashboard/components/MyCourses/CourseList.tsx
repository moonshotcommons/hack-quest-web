import { CourseDetailType, CourseType, ProcessType, ProjectCourseType } from '@/service/webApi/course/type';
import React, { useContext } from 'react';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';

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
        return (
          <MobElectiveCard
            course={course as ElectiveCourseType}
            from={'dashboard'}
            inProgress={curTab === ProcessType.IN_PROCESS}
          />
        );
      case CourseType.GUIDED_PROJECT:
        return (
          <MobPracticeCard
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
      <h3 className="text-h4 text-neutral-off-black">{t('dashboard.learningTracks')}</h3>
      <div className="mt-[16px] flex flex-col gap-[20px]">
        {list.map((course) => (
          <div key={course.id} className="w-full">
            {card(course)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
