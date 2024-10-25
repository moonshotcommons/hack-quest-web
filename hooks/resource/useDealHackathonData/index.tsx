import moment from 'moment';
import {
  HackathonManageApplicationMemberType,
  HackathonManageApplicationType,
  HackathonMemberType,
  HackathonRewardType,
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import dayjs from 'dayjs';
import { hackathonSections, modalList } from './data';
import webApi from '@/service';
import { exportToXlsx, isUuid } from '@/helper/utils';
import { thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { useContext, useMemo } from 'react';
import {
  HackathonDetailContext,
  HackathonEditContext
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { exportToCsv } from '../../../helper/utils';

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
    const end = +new Date(endTime).toLocaleString();
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
    let step = 4;
    //还未开始注册 -1
    if (dayjs().isBefore(dayjs.utc(hackathon.timeline?.registrationOpen).local())) step = -1;
    // 开始注册 0
    if (
      dayjs().isAfter(dayjs.utc(hackathon.timeline?.registrationOpen).local()) &&
      dayjs().isBefore(dayjs.utc(hackathon.timeline?.registrationClose).local())
    )
      step = 0;
    // 注册结束但未开始提交 1
    if (
      dayjs().isAfter(dayjs.utc(hackathon.timeline?.registrationClose).local()) &&
      dayjs().isBefore(dayjs.utc(hackathon.timeline?.submissionOpen).local())
    ) {
      step = 1;
    }
    // 开始提交 2
    if (
      dayjs().isAfter(dayjs.utc(hackathon.timeline?.submissionOpen).local()) &&
      dayjs().isBefore(dayjs.utc(hackathon.timeline?.submissionClose).local())
    )
      step = 2;
    // 提交结束 开始投票 3
    if (
      dayjs().isAfter(dayjs.utc(hackathon.timeline?.submissionClose).local()) &&
      dayjs().isBefore(dayjs.utc(hackathon.timeline?.rewardTime).local())
    )
      step = 3;
    // 过期 4
    if (dayjs().isAfter(dayjs.utc(hackathon.timeline?.rewardTime).local())) step = 4;
    return step;
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

  const getCustomNavs = (hackathon: HackathonType) => {
    return (
      hackathon.info?.sections?.customs?.map((v) => ({
        label: v.title,
        value: `${v.type}-${v.id}`
      })) || []
    );
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

    const customNavs = getCustomNavs(hackathon) || [];

    list = [...list, ...addList, ...customNavs];
    return list;
  };

  const getInfoObj = (
    hackathon: HackathonType,
    infoKey: 'About' | 'Contact' | 'OnlineProfiles',
    key: string,
    value: string | { label: string; value: string }
  ) => {
    if (isUuid(key)) {
      if (typeof value === 'object') {
        return value;
      } else {
        const application = hackathon?.info?.application;
        const label = (application[infoKey]?.find((v) => v.id === key)?.property as any)?.label;
        return {
          label,
          value
        };
      }
    } else {
      return {
        label: key,
        value
      };
    }
  };

  const getInfo = (
    hackathon: HackathonType,
    item: HackathonMemberType | HackathonManageApplicationType | HackathonManageApplicationMemberType
  ) => {
    item.info = item.info || {};
    const info: Record<string, any> = {
      createdAt: dayjs(item.createdAt).format('YYYY-M-D HH:mm'),
      name: (item as HackathonManageApplicationMemberType).name,
      teamName: (item as HackathonManageApplicationMemberType).teamName,
      teamRole: (item as HackathonManageApplicationMemberType).isAdmin ? 'leader' : 'member'
    };
    for (let infoKey in item.info) {
      const iKey = infoKey as keyof typeof item.info;
      const vInfo = item.info[iKey];
      for (let dataKey in vInfo) {
        const dKey = dataKey as keyof typeof vInfo;
        const appInfo = getInfoObj(hackathon, iKey, dKey, vInfo[dKey]);
        info[appInfo['label']] = appInfo['value'];
      }
    }
    return info;
  };

  const hackathonDownload = ({ id, type }: { id: string; type: string }, cb: VoidFunction) => {
    webApi.resourceStationApi
      .getHackathonMember(id)
      .then((members) => {
        webApi.resourceStationApi
          .getHackathonDetail(id)
          .then((hackathon) => {
            const memberDatas: Record<string, any>[] = [];
            members?.data?.map((v) => {
              memberDatas.push(getInfo(hackathon, v));
            });
            if (type === 'xlsx') {
              exportToXlsx(memberDatas, `${hackathon.name} members`);
            } else {
              exportToCsv(memberDatas, `${hackathon.name} members`);
            }
          })
          .finally(() => {
            cb();
          });
      })
      .catch(() => {
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
    getInfoObj,
    getInfo,
    hackathonDownload,
    getHackathonTimeSame,
    getLinks,
    getHasHackathonSection
  };
};

export default useDealHackathonData;
