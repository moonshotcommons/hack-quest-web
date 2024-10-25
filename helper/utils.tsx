import * as React from 'react';
import { CourseTrackType, CourseType } from '@/service/webApi/course/type';
import { type ReadonlyURLSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { JumpLeaningLessonType } from '@/hooks/courses/useJumpLeaningLesson';
import MenuLink from '@/constants/MenuLink';
import PracticeImg1 from '@/public/images/home/practices_img1.png';
import PracticeImg2 from '@/public/images/home/practices_img2.png';
import PracticeImg3 from '@/public/images/home/practices_img3.png';
import PracticeImg4 from '@/public/images/home/practices_img4.png';
import Image from 'next/image';
import message from 'antd/es/message';
import * as XLSX from 'xlsx';
import dayjs from '@/components/Common/Dayjs';
import { cloneDeep } from 'lodash-es';
import stringify from 'csv-stringify';
import toast from 'react-hot-toast';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCourseLink = (courseType?: CourseType) => {
  if (!courseType) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
      return `/syntax`;
    case CourseType.GUIDED_PROJECT:
      return `/guided-project`;
    case CourseType.LEARNING_TRACK:
      return `/learning-track`;
    case CourseType.UGC:
      return `/ugc`;
    case CourseType.MINI:
      return `/mini`;
  }
};

export const getCoursePrefixByCourseType = (courseType?: CourseType) => {
  if (!courseType) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
    case CourseType.GUIDED_PROJECT:
    case CourseType.UGC:
      return '/practices';
    case CourseType.MINI:
      return `/electives`;
    case CourseType.LEARNING_TRACK:
      return `/learning-track`;
  }
};

export const getLessonLink = (
  courseType: CourseType,
  courseName: string | undefined,
  documentationId: string,
  lessonId: string,
  menuCourseId: string,
  linkParam?: JumpLeaningLessonType
) => {
  if (!courseType || !courseName || !lessonId) return '/404';
  const lParam = linkParam || {
    menu: Menu.ELECTIVES,
    idTypes: [QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
    ids: [menuCourseId, documentationId]
  };
  let link = `${getCourseLink(courseType)}/${courseName}/learn/${lessonId}?menu=${lParam.menu}`;
  lParam.idTypes.map((v: string, i: number) => {
    link += `&${v}=${lParam.ids[i]}`;
  });
  return link;
};

// export const getLessonLink = (
//   courseType: CourseType,
//   courseName: string | undefined,
//   lessonId: string
// ) => {
//   if (!courseType || !courseName || !lessonId) return '/404';
//   return `${getCourseLink(courseType)}/${courseName}/learn/${lessonId}`;
// };

export const changeTextareaHeight = (target: HTMLTextAreaElement, minHeight = 25) => {
  // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
  target.style.height = `${minHeight}px`;
  // 获取textarea的内容高度，并加上padding和border的高度
  let height = target.scrollHeight < minHeight ? minHeight : target.scrollHeight;
  // 将textarea的高度设置为内容高度
  target.style.height = height + 'px';
};

//元素抖动
export const elementVibration = (ele: HTMLElement) => {
  ele.classList.add('input-quiver');
  setTimeout(() => {
    ele.classList.remove('input-quiver');
  }, 300);
};

export const adaptWidth = (target: HTMLInputElement, minWidth = 110) => {
  const parentEleWidth = target.parentElement?.getBoundingClientRect().width || 0;
  const len = target.value.length;
  let width = len * 7.6;
  if (width < minWidth) width = minWidth;
  else if (width > parentEleWidth / 2) width = parentEleWidth / 2;
  target.style.width = `${width}px`;
};

export const changeInputWidth = (target: HTMLInputElement, minWidth = 110) => {
  target.style.width = `${minWidth}px`;
  // 获取input的内容宽度，并加上padding和border的高度
  let width = target.scrollWidth < minWidth ? minWidth : target.scrollWidth;
  // 将input的宽度设置为内容宽度
  target.style.width = `${width}px`;
};

export const throttle = (fn: any) => {
  let throttleTimer: NodeJS.Timeout | null = null;
  let startTime = +new Date();
  const waitTime = 100;
  return function () {
    var curTime = +new Date();
    var remaining = waitTime - (curTime - startTime);
    throttleTimer && clearTimeout(throttleTimer);
    if (remaining > 0) {
      throttleTimer = setTimeout(fn, remaining);
    } else {
      startTime = curTime;
    }
  };
};

export const deepClone = (obj: any) => {
  if (obj === null || typeof obj !== 'object') return obj;
  const result: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
};

export const { isValidElement } = React;

export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === React.Fragment;
}

type AnyObject = Record<PropertyKey, any>;

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | void);

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props?: RenderProps
): React.ReactNode {
  if (!isValidElement(element)) {
    return replacement;
  }
  return React.cloneElement(element, typeof props === 'function' ? props(element.props || {}) : props);
}

export function cloneElement(element: React.ReactNode, props?: RenderProps): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}

export async function urlToBlobAndBase64(url: string) {
  return new Promise<{ base64: string; blob: BlobPart }>(async (resolve, reject) => {
    try {
      let blob: Blob;
      if (!url.startsWith('/')) {
        const response = await fetch('/api/helper/fetch-image', {
          body: JSON.stringify({ url }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: 'force-cache'
        });

        blob = await response.blob();
      } else {
        const response = await fetch(url);
        blob = await response.blob();
      }
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve({
          base64,
          blob
        });
      };
    } catch (err) {
      reject(err);
    }
  });
}

export const separationNumber = (num: number, maxNum?: number) => {
  if (typeof num !== 'number' || isNaN(num)) return 0;
  const isMaxNum = maxNum && num > maxNum;
  let sNum;
  if (isMaxNum) {
    sNum = maxNum;
  } else {
    sNum = num;
  }
  const str = String(sNum).replace(/(?!^)(?=(\d{3})+$)/g, ',');
  return isMaxNum ? `${str}+` : str;
};

export const getSearchParamsUrl = (info: Record<string, any>, path: MenuLink) => {
  if (typeof window !== 'object') return '';
  const url = new URL(path, window.location.href);
  for (const key in info) {
    const value = info[key as keyof typeof info];
    if (!value) continue;
    url.searchParams.append(key, value);
  }
  return url.toString();
};

export const getCoverImageByTrack = (track: CourseTrackType) => {
  switch (track) {
    case CourseTrackType.DeFi:
      return <Image src={PracticeImg1} width={239} alt="practice" className="absolute right-0 top-0"></Image>;
    case CourseTrackType.NFT:
      return (
        <Image
          src={PracticeImg2}
          width={126}
          alt="practice"
          // className="absolute right-[32px] top-[32px]"
          // className="absolute right-[32px] top-[36px]"
          className="absolute right-[40px] top-[30px]"
        ></Image>
      );
    case CourseTrackType.Gaming:
      return <Image src={PracticeImg3} width={178} alt="practice" className="absolute right-[40px] top-[24px]"></Image>;
    case CourseTrackType.Security:
      return <Image src={PracticeImg4} width={123} alt="practice" className="absolute right-[40px] top-[20px]"></Image>;
    default:
      return <Image src={PracticeImg1} width={239} alt="practice" className="absolute right-0 top-0"></Image>;
  }
};
const checkByRegExp = (regExp: RegExp) => {
  return function (str: string) {
    return regExp.test(str);
  };
};
export const isUuid = checkByRegExp(/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/);

export const isNullByRegExp = checkByRegExp(/^\s*$/);

export const isEthAddress = checkByRegExp(/^(0x)?[0-9a-fA-F]{40}$/);

export const isNull = (str: any) => {
  return !!(!str || isNullByRegExp(str as string));
};

export const truncateMiddle = (str: any, start = 6, end = 4) => {
  if (typeof str !== 'string') return '';
  const replaceStr = str?.toString()?.replace(/(.{6})(.*)(.{4})/, '$1...$3');
  return replaceStr;
};

export const isValidImageType = (type: string) => {
  const validImageType = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
  return validImageType.includes(type);
};

export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', function (_event) {
      let duration = audio.duration; // 得到视频或音频的时长，单位秒
      resolve(duration);
    });
  });
};

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
  return `${pathname}${queryString}`;
}

/** 向下保留小数  */
export const decimalCount = (number: number, digit = 1) => {
  if (isNaN(number)) return 0;
  if (digit < 1) return number;
  const digitHundred = parseInt(`1${'0'.repeat(digit)}`);
  return Math.floor(number * digitHundred) / digitHundred;
};

/** 向下保留小数 返回百分数  */
export const decimalCountPercent = (number: number, digit = 1) => {
  if (isNaN(number)) return 0;
  if (digit < 1) return number;
  const digitHundred = parseInt(`1${'0'.repeat(digit)}`);
  return `${Math.floor(number * digitHundred * 100) / digitHundred}%`;
};

export const copyText = async (text?: string) => {
  if (!text) message.warning('There is nothing to copy!');
  try {
    await navigator.clipboard.writeText(text || '');
    message.success('Copy success!');
  } catch (e) {
    message.warning('The browser version is too low or incompatible！');
  }
};

export const toDoubleArray = <T,>(baseArray: T[], count: number) => {
  const copyArray = [...baseArray];
  let res = [];
  while (copyArray.length) {
    res.push(copyArray.splice(0, count));
  }
  return res;
};

export const getYoutubeId = (url: string) => {
  if (!url) return '';
  const regex = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})(?:\S+)?$/;
  const match = url.match(regex);

  // 如果匹配成功，则返回视频 ID
  if (match && match[1]) {
    return match[1];
  }
  return '';
};

export const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const exportToXlsx = (data: Record<string, any>[], name = '未命名') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const downloadLink = window.URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = downloadLink;
  link.download = `${name}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(downloadLink);
};

export const exportToCsv = (data: Record<string, any>[], name = '未命名') => {
  const columns: string[] = [];
  data.forEach((item) => {
    for (let key in item) {
      if (!~columns.indexOf(key)) {
        columns.push(key);
      }
    }
  });
  stringify(data, { header: true, columns }, (err: any, output: any) => {
    if (err) {
      toast.error(err.message);
      return;
    }
    // 创建一个 Blob 对象
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${name}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

export const arraySortByKey = (data: any[], key: string): any[] => {
  if (!data?.length || !key) return [];
  const isDesc = key.startsWith('-');
  let newKey = isDesc ? key.slice(1) : key;
  const newData = cloneDeep(data);
  switch (newKey) {
    case 'createdAt':
      return newData.sort((a, b) => {
        const at = new Date(a[newKey]) as unknown as number;
        const bt = new Date(b[newKey]) as unknown as number;
        return isDesc ? bt - at : at - bt;
      });
    case 'name':
      return newData.sort((a, b) => {
        return isDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      });
    default:
      return newData.sort((a, b) => {
        return isDesc ? b[newKey] - a[newKey] : a[newKey] - b[newKey];
      });
  }
};

/**
 *
 * @returns 获取当日的24:00
 */
export function getEndOfDay() {
  // 使用dayjs获取当日的日期
  const today = dayjs();
  // 如果需要获取当日的24:00，实际上是次日的00:00
  const nextDay = today.add(1, 'day');
  // 返回次日的00:00
  return nextDay.startOf('day');
}

export const insertAsterisk = ({
  str,
  starCount = 3,
  start,
  end
}: {
  str: string;
  starCount?: number;
  start: number;
  end?: number;
}) => {
  if (!str) return '';
  end = end || start;
  // 确保 start 和 end 在有效范围内
  if (start < 0 || end > str.length || start + end > str.length) {
    return str;
  }
  const before = str.slice(0, start);
  const after = str.slice(str.length - end, str.length);
  const asterisks = '.'.repeat(starCount);

  return before + asterisks + after;
};

// 根据字符串生成一个负数id
export const generateChainId = (str: string) => {
  // 使用示例
  let chainId = Number(stringToAscii()) << 10;
  chainId = chainId > 0 ? chainId * -1 : chainId;
  return chainId;

  function stringToAscii() {
    return str
      .split('')
      .map((char) => char.charCodeAt(0))
      .join('');
  }
};
