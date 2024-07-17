import moment from 'moment';
import { HackathonRewardType, HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import dayjs from '@/components/Common/Dayjs';
import { hackathonSections, modalList } from './data';
import webApi from '@/service';
import { exportToExcel } from '@/helper/utils';
import { thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { useContext, useMemo } from 'react';
import {
  HackathonDetailContext,
  HackathonEditContext
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

const useDealHackathonData = () => {
  const { navs: editNavs } = useContext(HackathonEditContext);
  const { navs: detailNavs } = useContext(HackathonDetailContext);
  const navs = useMemo(() => {
    return editNavs.length ? editNavs : detailNavs;
  }, [editNavs, detailNavs]);
  const getRunFromTime = (startTime: string, endTime: string) => {
    startTime = moment(startTime).format('ll');
    endTime = moment(endTime).format('ll');
    return `${startTime} - ${endTime}`;
  };

  const getCloseInTime = (endTime: string) => {
    const start = +new Date();
    const end = +new Date(endTime);
    const gapTime = end - start;
    if (gapTime <= 0) {
      return HackathonStatusType.PAST;
    }
    const mTime = 60 * 1000;
    const HTime = 60 * mTime;
    const dTime = 24 * HTime;
    const d = Math.floor(gapTime / dTime);
    const h = Math.floor((gapTime - dTime * d) / HTime);
    const m = Math.floor((gapTime - dTime * d - HTime * h) / mTime);
    return `${isShowTime(d, 'd')}${isShowTime(h, 'h')}${isShowTime(m, 'm')}`;
  };

  const getParticipantsStr = (participants: string[]) => {
    return participants.join('/');
  };

  const isShowTime = (t: number, s: string) => {
    if (t > 0) {
      return `${t}${s}${s !== 'm' ? ':' : ''}`;
    } else {
      return '';
    }
  };

  const getTotalPrize = (rewards: HackathonRewardType[]) => {
    const total = rewards?.reduce((pre, next) => {
      return pre + Number(next.totalRewards);
    }, 0);
    return total || 0;
  };

  const getStepIndex = (hackathon: HackathonType) => {
    if (dayjs().tz().isBefore(hackathon.timeline?.registrationOpen)) return -1;
    if (
      dayjs().tz().isAfter(hackathon.timeline?.registrationOpen) &&
      dayjs().tz().isBefore(hackathon.timeline?.registrationClose)
    )
      return 0;
    if (
      dayjs().tz().isAfter(hackathon.timeline?.submissionClose) &&
      dayjs().tz().isBefore(hackathon.timeline?.rewardTime)
    )
      return 1;
    if (dayjs().tz().isAfter(hackathon.timeline?.rewardTime)) return 2;
    return -1;
  };

  const dealModalList = (hackathon: HackathonType) => {
    const newList = modalList.map((v) => {
      const added = hackathon.progress?.includes(v.type);
      return {
        ...v,
        added
      };
    });
    return newList;
  };

  const getSectionProgress = (progress: string[]) => {
    const { require, optional } = hackathonSections;
    let requireCompletedLen = 0;
    const requires = require.map((v) => {
      const isCompleted = progress.includes(v);
      isCompleted && (requireCompletedLen += 1);
      return {
        value: v,
        isCompleted
      };
    });
    let optionalCompletedLen = 0;
    const optionals = optional.map((v) => {
      const isCompleted = progress.includes(v);
      isCompleted && (optionalCompletedLen += 1);
      return {
        value: v,
        isCompleted
      };
    });
    return {
      requires,
      requireCompletedLen,
      optionals,
      optionalCompletedLen,
      requireCompleted: requireCompletedLen === requires.length
    };
  };

  const getHackathonNavList = ({
    hackathon,
    isDetail = false,
    initNavs
  }: {
    hackathon: HackathonType;
    isDetail?: boolean;
    initNavs: {
      label: string;
      value: string;
    }[];
  }) => {
    let list = [...initNavs];
    if (isDetail) {
      if (
        (typeof hackathon.info?.description === 'string' && hackathon.info?.description) ||
        hackathon.info?.description?.length ||
        hackathon.info?.description?.type === TEXT_EDITOR_TYPE
      ) {
        list.push({
          label: 'hackathonDetail.description',
          value: 'description'
        });
      }
      if (hackathon.rewards?.length) {
        list.push({
          label: 'hackathonDetail.rewards',
          value: 'rewards'
        });
      }
      if (hackathon.judge?.length || hackathon.info?.sections?.criteria?.length) {
        list.push({
          label: 'hackathonDetail.judge',
          value: 'judge'
        });
      }
      if (hackathon.info?.sections?.coHosts?.list?.length) {
        list.push({
          label: 'hackathonDetail.coHosts',
          value: 'coHosts'
        });
      }
      if (hackathon.info?.sections?.theme?.length) {
        list.push({
          label: 'hackathonDetail.theme',
          value: 'theme'
        });
      }
      if (hackathon.info?.sections?.resource?.length) {
        list.push({
          label: 'hackathonDetail.resource',
          value: 'resource'
        });
      }
    }
    const addList = dealModalList(hackathon)
      .filter((v) => v.added)
      .map((v) => ({
        label: hackathon.info?.sections?.[v.type]?.title || `hackathonDetail.${v.type}`,
        value: v.type
      }));

    list = [...list, ...addList];
    return list;
  };

  const hackathonDownload = (id: string, cb: VoidFunction) => {
    webApi.resourceStationApi
      .getHackathonDetail(id)
      .then((hackathon) => {
        const memberDatas: Record<string, any>[] = [];
        hackathon.members?.map((v) => {
          v.info = v.info || {};
          const info: Record<string, any> = {
            createdAt: dayjs(v.createdAt).format('YYYY-M-D HH:mm')
          };
          for (let infoKey in v.info) {
            const iKey = infoKey as keyof typeof v.info;
            const vInfo = v.info[iKey];
            for (let dataKey in vInfo) {
              const dKey = dataKey as keyof typeof vInfo;
              info[dataKey] = vInfo[dKey];
            }
          }
          memberDatas.push(info);
        });
        exportToExcel(memberDatas, `${hackathon.name} members`);
      })
      .finally(() => {
        cb();
      });
  };

  const getHackathonTimeSame = (hackathon: HackathonType) => {
    const timeline = hackathon.timeline;
    if (!timeline) return false;
    const { registrationOpen, registrationClose, submissionOpen, submissionClose } = timeline;
    return registrationOpen === submissionOpen && registrationClose === submissionClose;
  };

  const getLinks = (hackathon: HackathonType) => {
    const keys = Object.keys(hackathon.links?.links || {}) || [];
    const ls: Record<string, any>[] = [];
    keys.map((k) => {
      hackathon.links?.links?.[k] &&
        ls.push({
          icon: thirdPartyMedia[k as 'x'].icon,
          link: hackathon.links?.links?.[k],
          label: k
        });
    });
    return ls || [];
  };

  const getHasHackathonSection = (type: string) => {
    return navs?.some((v) => v.value === type);
  };

  return {
    getRunFromTime,
    getCloseInTime,
    getParticipantsStr,
    getTotalPrize,
    getStepIndex,
    dealModalList,
    getSectionProgress,
    getHackathonNavList,
    hackathonDownload,
    getHackathonTimeSame,
    getLinks,
    getHasHackathonSection
  };
};

export default useDealHackathonData;
