import moment from 'moment';
import {
  HackathonInfoSPKeys,
  HackathonRewardType,
  HackathonStatusType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import dayjs from '@/components/Common/Dayjs';
import { hackathonSections, modalList } from './data';

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
    if (dayjs().tz().isBefore(hackathon.timeline?.openTime)) return -1;
    if (dayjs().tz().isAfter(hackathon.timeline?.openTime) && dayjs().tz().isBefore(hackathon.timeline?.reviewTime))
      return 0;
    if (dayjs().tz().isAfter(hackathon.timeline?.reviewTime) && dayjs().tz().isBefore(hackathon.timeline?.rewardTime))
      return 1;
    if (dayjs().tz().isAfter(hackathon.timeline?.rewardTime)) return 2;
    return -1;
  };

  const dealModalList = (hackathon: HackathonType) => {
    const newList = modalList.map((v) => {
      const added = hackathon.info?.sections?.[v.type as HackathonInfoSPKeys | 'schedule' | 'faqs']?.list?.length > 0;
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

  return {
    getRunFromTime,
    getCloseInTime,
    getParticipantsStr,
    getTotalPrize,
    getStepIndex,
    dealModalList,
    getSectionProgress
  };
};

export default useDealHackathonData;
