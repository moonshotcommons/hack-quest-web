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
      <div className="mx-auto w-[996px] py-[60px]">
        <Certificate ecosystem={ecosystem} />
      </div>
      <div className="mx-auto flex w-[996px] items-stretch gap-[20px] pb-[100px]">
        <div className="flex w-[24px] flex-shrink-0 items-stretch justify-center">
          <div className="border-l border-dashed border-neutral-medium-gray"></div>
        </div>
        <div className="flex flex-1 flex-col gap-[100px]">
          <EcoList list={learnList} />
          <CourseList list={buildList} />
          <MoreResource lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default EcosystemDetail;
