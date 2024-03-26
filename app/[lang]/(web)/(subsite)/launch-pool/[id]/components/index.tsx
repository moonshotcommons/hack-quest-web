'use client';
import React, { useMemo, useRef, useState } from 'react';
import Nav from './Nav';
import Content from './Content';
import { LaunchDetailContext, LaunchInfoType } from '../constants/type';
import {
  FuelInfo,
  LaunchPoolProjectType,
  ParticipateInfo
} from '@/service/webApi/launchPool/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

interface LaunchDetailPageProp {
  id: string;
}

const LaunchDetailPage: React.FC<LaunchDetailPageProp> = ({ id }) => {
  const [projectInfo, setProjectInfo] = useState<LaunchPoolProjectType | null>(
    null
  );
  const [participateInfo, setParticipateInfo] =
    useState<ParticipateInfo | null>(null);
  const [fuelsInfo, setfFelsInfo] = useState<FuelInfo[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [anchorOffsetTops, setAnchorOffsetTops] = useState<number[]>([]);
  const isOnScoll = useRef(false);
  const { run: getProjectInfo, loading } = useRequest(
    async () => {
      const projectInfo = await webApi.launchPoolApi.getProjectById(id);
      return projectInfo;
    },
    {
      onSuccess(res) {
        setProjectInfo(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );
  const { run: getParticipateInfo } = useRequest(
    async () => {
      const pInfo = await webApi.launchPoolApi.getParticipateInfo(id);
      return pInfo;
    },
    {
      onSuccess(res) {
        setParticipateInfo(res);
        !Object.keys(res).length && getFulesInfo();
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { run: getFulesInfo } = useRequest(
    async () => {
      const fInfo = await webApi.launchPoolApi.getFuelsInfo(id);
      return fInfo;
    },
    {
      manual: true,
      onSuccess(res) {
        setfFelsInfo(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const launchInfo = useMemo(() => {
    return {
      ...projectInfo,
      participateInfo,
      fuelsInfo
    };
  }, [projectInfo, participateInfo, fuelsInfo]);
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: anchorOffsetTops[index] - 40,
      behavior: 'smooth'
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 1000);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    for (let i = 0; i < anchorOffsetTops.length; i++) {
      if (scrollTop >= anchorOffsetTops[anchorOffsetTops.length - 1] - 40) {
        setCurAnchorIndex(anchorOffsetTops.length - 1);
        break;
      } else if (
        scrollTop >= anchorOffsetTops[i] - 40 &&
        scrollTop < anchorOffsetTops[i + 1] - 40
      ) {
        setCurAnchorIndex(i);
        break;
      }
    }
  };

  return (
    <LaunchDetailContext.Provider
      value={{ launchInfo: launchInfo as LaunchInfoType }}
    >
      <div
        className="scroll-wrap-y h-full py-[40px]"
        ref={boxRef}
        onScroll={handleScoll}
      >
        <div className="container  mx-auto flex">
          <div className="relative w-[345px]">
            <Nav
              curAnchorIndex={curAnchorIndex}
              handleClickAnchor={handleClickAnchor}
            />
          </div>
          <Content
            setAllTops={(tops) => setAnchorOffsetTops(tops)}
            loading={loading}
          />
        </div>
      </div>
    </LaunchDetailContext.Provider>
  );
};

export default LaunchDetailPage;
