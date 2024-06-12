import React, { useContext } from 'react';
import Title from '../Title';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { LangContext } from '@/components/Provider/Lang';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { ProjectCourseType } from '@/service/webApi/course/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';

interface CourseListProp {
  list: EcosystemTask[];
}

const CourseList: React.FC<CourseListProp> = ({ list }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  if (!list.length) return null;
  return (
    <div className="flex w-full flex-col gap-[100px]">
      {list.map((task) => (
        <div className="flex w-full flex-col gap-[32px]" key={task.taskId}>
          <Title title={task.name} description={task.description} />
          <div className="flex w-full gap-[20px]">
            {task.courses?.slice(0, 3)?.map((course) => (
              <div key={course.id} className="w-[calc((100%-40px)/3)]">
                <PracticeCard course={course as ProjectCourseType} />
              </div>
            ))}
          </div>
          {task.courses.length > 3 && (
            <div className="flex justify-center">
              <Link href={`${MenuLink.PRACTICES}?track=${task.track}&language=${task.language}`}>
                <Button
                  ghost
                  className="button-text-m h-[48px] w-[165px] border-neutral-black p-0 uppercase text-neutral-black"
                >
                  {t('exploreMore')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
