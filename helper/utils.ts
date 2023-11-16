import { Menu, QueryIdType } from '@/components/v2/Breadcrumb/type';
import { JumpLeaningLessonType } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseType } from '@/service/webApi/course/type';
import { message } from 'antd';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCourseLink = (courseType?: CourseType) => {
  if (!courseType) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
      return `/syntax`;
    case CourseType.CONCEPT:
      return `/concept`;
    case CourseType.GUIDED_PROJECT:
      return `/guided-project`;
    case CourseType.LEARNING_TRACK:
      return `/learning-track`;
    case CourseType.HACKATHON:
      return `/hackathon`;
    case CourseType.TEASER:
      return `/teaser`;
    case CourseType.Mini:
      return `/mini`;
  }
};

export const getLessonLink = (
  courseType: CourseType,
  courseName: string,
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
  let link = `${getCourseLink(
    courseType
  )}/${courseName}/learn/${lessonId}?menu=${lParam.menu}`;
  lParam.idTypes.map((v: string, i: number) => {
    link += `&${v}=${lParam.ids[i]}`;
  });
  return link;
};

export const changeTextareaHeight = (target: HTMLTextAreaElement) => {
  // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
  target.style.height = '40px';
  // 获取textarea的内容高度，并加上padding和border的高度
  let height = target.scrollHeight;
  // 将textarea的高度设置为内容高度
  target.style.height = height + 'px';
};

export const adaptWidth = (target: HTMLInputElement) => {
  const parentEleWidth =
    target.parentElement?.getBoundingClientRect().width || 0;
  const minWidth = 110;
  const len = target.value.length;
  let width = len * 7.6;
  if (width < minWidth) width = minWidth;
  else if (width > parentEleWidth / 2) width = parentEleWidth / 2;
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

export const errorMessage = (err: any) => {
  const msg = err.msg || err.message;
  msg && message.error(msg);
};

import * as React from 'react';

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
  return React.cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  );
}

export function cloneElement(
  element: React.ReactNode,
  props?: RenderProps
): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}

export async function urlToBlobAndBase64(url: string) {
  return new Promise<{ base64: string; blob: BlobPart }>(
    async (resolve, reject) => {
      try {
        let blob: Blob;
        if (!url.startsWith('/')) {
          const response = await fetch('/api/helper/fetch-image', {
            body: JSON.stringify({ url }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
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
    }
  );
}
