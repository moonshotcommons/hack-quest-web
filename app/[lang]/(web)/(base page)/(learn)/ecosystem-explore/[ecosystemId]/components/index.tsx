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
  const learn = useMemo(() => {
    task.learn.map((v) => (v.courses = v.courses || v.learningTracks));
    return task.learn;
  }, [task]);
  return (
    <div>
      <Banner lang={lang} ecosystem={ecosystem} />
      <div className="mx-auto w-[996px] py-[60px]">
        <Certificate ecosystem={ecosystem} levels={levels} />
      </div>
      <div className="mx-auto flex w-[996px] items-stretch gap-[20px] pb-[100px]">
        <div className="flex w-[24px] flex-shrink-0 items-stretch justify-center">
          <div className="border-l border-dashed border-neutral-medium-gray"></div>
        </div>
        <div className="flex flex-1 flex-col gap-[100px]">
          <EcoList list={learn || []} />
          <CourseList list={task.build || []} />
          <MoreResource lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default EcosystemDetail;
