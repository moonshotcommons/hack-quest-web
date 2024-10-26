import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// 导入时区相关插件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// 设置默认时区
// dayjs.tz.setDefault('Asia/Shanghai');

export function dateToUTC(date: string, timezone: string) {
  return dayjs.tz(date, timezone).utc();
}

export function timelineDateFormat(date?: string, timezone?: string) {
  return dayjs(date).tz(timezone).format('YYYY-MM-DDTHH:mm');
}

export default dayjs;
