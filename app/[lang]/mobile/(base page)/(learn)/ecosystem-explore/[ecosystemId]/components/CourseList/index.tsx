import React, { useContext } from 'react';
import Title from '../Title';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { ProjectCourseType } from '@/service/webApi/course/type';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';

interface CourseListProp {
  list: EcosystemTask[];
}

const CourseList: React.FC<CourseListProp> = ({ list }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  if (!list.length) return null;
  return (
    <div className="flex w-full flex-col gap-[2.5rem]">
      {list.map((task) => (
        <div className="flex w-full flex-col gap-[1.25rem]" key={task.taskId}>
          <Title title={task.name} description={task.description} />
          <div className="flex flex-col gap-[20px]">
            {task.courses?.slice(0, 4)?.map((course) => (
              <div key={course.id} className="w-full">
                <MobPracticeCard course={course as ProjectCourseType} />
              </div>
            ))}
          </div>
          {task.courses.length > 4 && (
            <div className="flex justify-center">
              <Link href={`${MenuLink.PRACTICES}?track=${task.track}&language=${task.language}`}>
                <Button
                  ghost
                  className="button-text-m h-[3rem] w-[10.3125rem] border-neutral-black p-0 uppercase text-neutral-black"
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
