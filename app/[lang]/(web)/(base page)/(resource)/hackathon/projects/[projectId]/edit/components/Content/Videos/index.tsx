import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import VideoTab from './VideoTab';
import { sectionData } from '../../../constants';
import Title from '@/components/Common/Title';
import PitchVideoUpload from './PitchVideoUpload';
import ProjectDemoUpload from './ProjectDemoUpload';

interface VideosProp {
  project: ProjectType;
  isClose: boolean;
}

const Videos: React.FC<VideosProp> = ({ project, isClose }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const videoTab = useMemo(() => {
    return [
      {
        label: t('projectsDetail.pitchVideo'),
        component: <PitchVideoUpload pitchVideo={project.video} projectId={project.id} isClose={isClose} />
      },
      {
        label: t('projectsDetail.demoVideo'),
        component: <ProjectDemoUpload demoVideo={project.demo} projectId={project.id} isClose={isClose} />
      }
    ];
  }, [project]);

  const [translateX, setTranslateX] = useState(0);
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    const width = boxRef.current?.offsetWidth || 0;
    setTranslateX(-(width * curIndex + 20 * curIndex));
  }, [curIndex]);

  return (
    <div className="flex w-full flex-col gap-[32px] overflow-hidden" ref={boxRef}>
      <Title>
        <span className="text-h3">{t(sectionData[sectionData.length - 3])}</span>
      </Title>
      {videoTab.length > 1 && (
        <>
          <VideoTab
            tab={videoTab.map((item) => ({ label: item.label }))}
            curIndex={curIndex}
            handleChangeTab={setCurIndex}
          />
          <div className="overflow-hidden rounded-[10px]" style={{ width: `${boxRef.current?.offsetWidth}px` }}>
            <div
              className="flex gap-[20px] transition-all"
              style={{
                transform: `translateX(${translateX}px)`
              }}
            >
              {videoTab.map((v, index) => (
                <div key={v.label} className="flex-shrink-0" style={{ width: `${boxRef.current?.offsetWidth}px` }}>
                  {curIndex === index && v.component}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Videos;
