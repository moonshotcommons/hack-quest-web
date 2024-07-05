'use client';
import { Lang } from '@/i18n/config';
import React, { useMemo } from 'react';
import Banner from './Banner';
import EcoList from './EcoList';
import CourseList from './CourseList';
import MoreResource from './MoreResource';
import { EcosystemDetailType, EcosystemTask, LevelType } from '@/service/webApi/ecosystem/type';
import Certificate from './Certificate';

interface EcosystemDetailProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
  task: { learn: EcosystemTask[]; build: EcosystemTask[]; community: EcosystemTask[] };
  levels: LevelType[];
}

const EcosystemDetail: React.FC<EcosystemDetailProp> = ({ lang, ecosystem, task, levels }) => {
  const newTask = useMemo(() => {
    task?.learn?.map((v) => (v.courses = v.courses || v.learningTracks));
    task?.build?.map((v) => (v.courses = v.courses || v.hackathons));
    return {
      learn: task?.learn || [],
      build: task?.build || []
    };
  }, [task]);
  return (
    <div>
      <Banner lang={lang} ecosystem={ecosystem} />
      <div className="px-[1.25rem] py-[2.5rem]">
        <Certificate ecosystem={ecosystem} levels={levels} />
      </div>
      <div className="flex items-stretch gap-[.75rem] px-[1.25rem] pb-[11.25rem]">
        <div className="flex w-[1rem] flex-shrink-0 items-stretch justify-center">
          <div className="border-l border-dashed border-neutral-medium-gray"></div>
        </div>
        <div className="flex flex-1 flex-col gap-[2.5rem]">
          <EcoList list={newTask.learn || []} />
          <CourseList list={newTask.build || []} />
          <MoreResource lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default EcosystemDetail;
