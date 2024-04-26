import moment from 'moment';
import { HackathonRewardType, HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import dayjs from '@/components/Common/Dayjs';

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
    let total = 0;
    rewards?.forEach((r) => {
      total += r.place.reduce((pre, next) => {
        return pre + next;
      }, 0);
    });
    return total;
  };
  const getStepIndex = (hackathon: HackathonType) => {
    if (dayjs().tz().isBefore(hackathon.openTime)) return -1;
    if (dayjs().tz().isAfter(hackathon.openTime) && dayjs().tz().isBefore(hackathon.reviewTime)) return 0;
    if (dayjs().tz().isAfter(hackathon.reviewTime) && dayjs().tz().isBefore(hackathon.rewardTime)) return 1;
    if (dayjs().tz().isAfter(hackathon.rewardTime)) return 2;
    return -1;
  };
  return {
    getRunFromTime,
    getCloseInTime,
    getParticipantsStr,
    getTotalPrize,
    getStepIndex
  };
};

export default useDealHackathonData;
