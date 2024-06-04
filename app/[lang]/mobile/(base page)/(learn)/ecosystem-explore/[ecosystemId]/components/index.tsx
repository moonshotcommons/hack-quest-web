'use client';
import { Lang } from '@/i18n/config';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import EcoList from './EcoList';
import CourseList from './CourseList';
import MoreResource from './MoreResource';
import { EcosystemDetailType, EcosystemTask } from '@/service/webApi/ecosystem/type';
import Certificate from './Certificate';
import webApi from '@/service';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';

interface EcosystemDetailProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const EcosystemDetail: React.FC<EcosystemDetailProp> = ({ lang, ecosystem }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const [learnList, setLearnList] = useState<EcosystemTask[]>([]);
  const [buildList, setBuildList] = useState<EcosystemTask[]>([]);
  const getList = async () => {
    const res = await webApi.ecosystemApi.getEcosystemTasks(ecosystem.info.id, {
      fullCourse: true,
      lang
    });
    res.learn.map((v) => (v.courses = v.courses || v.learningTracks));
    setLearnList(res.learn);
    setBuildList(res.build);
  };

  useEffect(() => {
    if (userInfo) getList();
  }, [userInfo]);
  return (
    <div>
      <Banner lang={lang} ecosystem={ecosystem} />
      <div className="px-[1.25rem] py-[2.5rem]">
        <Certificate ecosystem={ecosystem} />
      </div>
      <div className="flex items-stretch gap-[.75rem] px-[1.25rem] pb-[11.25rem]">
        <div className="flex w-[1rem] flex-shrink-0 items-stretch justify-center">
          <div className="border-l border-dashed border-neutral-medium-gray"></div>
        </div>
        <div className="flex flex-1 flex-col gap-[2.5rem]">
          <EcoList list={learnList} />
          <CourseList list={buildList} />
          <MoreResource lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default EcosystemDetail;
