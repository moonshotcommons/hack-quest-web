import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Title from '../../Title';
import VideoTab from './VideoTab';
import Video from '../../Video';
import { ProjectDetailContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface VideosProp {
  project: ProjectType;
}

const Videos: React.FC<VideosProp> = ({ project }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { titleTxtData } = useContext(ProjectDetailContext);
  const videoTab = useMemo(() => {
    const pitch = {
      label: t('projectsDetail.pitchVideo'),
      url: project.video
    };
    const demo = {
      label: t('projectsDetail.demoVideo'),
      url: project.demo
    };
    return [pitch, demo].filter((v: any) => v?.url);
  }, [project]);
  const [translateX, setTranslateX] = useState(0);
  const [curIndex, setCurIndex] = useState(0);
  useEffect(() => {
    const width = boxRef.current?.offsetWidth || 0;
    setTranslateX(-(width * curIndex + 20 * curIndex));
  }, [curIndex]);
  if (!videoTab.length) return null;
  return (
    <div className="flex w-full flex-col gap-[1.5rem] overflow-hidden" ref={boxRef}>
      <Title title={t(titleTxtData[titleTxtData.length - 3])} />
      {videoTab.length > 1 && <VideoTab tab={videoTab} curIndex={curIndex} handleChangeTab={setCurIndex} />}
      <div className={`overflow-x-hidden rounded-[10px]`} style={{ width: `${boxRef.current?.offsetWidth}px` }}>
        <div
          className="flex gap-[20px] transition-all"
          style={{
            transform: `translateX(${translateX}px)`
          }}
        >
          {videoTab.map((v) => (
            <div key={v.label} className="flex-shrink-0" style={{ width: `${boxRef.current?.offsetWidth}px` }}>
              <Video videoUrl={v.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
