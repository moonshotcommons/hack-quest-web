import moment from 'moment';
import { week } from './data';
import { HackathonStatusType } from '@/service/webApi/resourceStation/hackathon/type';

const useDealHackathonData = () => {
  const getRunFromTime = (time: string) => {
    const d: unknown = moment(time).format('d');
    return `${week[d as number]} ${moment(time).format('DD - MM,YYYY')}`;
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
  return {
    getRunFromTime,
    getCloseInTime,
    getParticipantsStr
  };
};

export default useDealHackathonData;
