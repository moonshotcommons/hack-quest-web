import * as React from 'react';
import { CourseTrackType, CourseType } from '@/service/webApi/course/type';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { JumpLeaningLessonType } from '@/hooks/courses/useJumpLeaningLesson';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import PracticeImg1 from '@/public/images/home/practices_img1.png';
import PracticeImg2 from '@/public/images/home/practices_img2.png';
import PracticeImg3 from '@/public/images/home/practices_img3.png';
import PracticeImg4 from '@/public/images/home/practices_img4.png';
import Image from 'next/image';

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
  lessonId: string,
  menuCourseId: string,
  linkParam?: JumpLeaningLessonType
) => {
  if (!courseType || !courseName || !lessonId) return '/404';
  const lParam = linkParam || {
    menu: Menu.ELECTIVES,
    idTypes: [QueryIdType.MENU_COURSE_ID],
    ids: [menuCourseId]
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

export const changeTextareaHeight = (target: HTMLTextAreaElement, minHeight = 40) => {
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

export const isNull = (str: any) => {
  return !!(!str || isNullByRegExp(str as string));
};
