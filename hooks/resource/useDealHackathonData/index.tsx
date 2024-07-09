import moment from 'moment';
import { HackathonRewardType, HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import dayjs from '@/components/Common/Dayjs';
import { hackathonSections, modalList } from './data';
import webApi from '@/service';

const useDealHackathonData = () => {
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
        hackathon.info?.description?.length
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
        label: hackathon.info?.sections?.[v.type]?.title || ` hackathonDetail.${v.type}`,
        value: v.type
      }));

    list = [...list, ...addList];
    return list;
  };

  const hackathonDownload = async (id: string, cb: VoidFunction) => {
    const hackathon = await webApi.resourceStationApi.getHackathonDetail(id);
    console.info(hackathon);
    cb();
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
    hackathonDownload
  };
};

export default useDealHackathonData;
