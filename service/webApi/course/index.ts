import WebService from '@/service/webService/webService';
import {
  CourseDetailType,
  CourseLessonStateType,
  CourseLessonType,
  CourseUnitStateType,
  CourseUnitType,
  ProjectCourseType,
  UGCCourseType,
  UnitPagesListType
} from './type';

import {
  EcosystemElectiveType,
  EcosystemProfileType,
  ElectiveCourseDetailType,
  ElectiveLessonType
} from '../elective/type';
import { PageResult } from '../type';
import { cache } from 'react';
export enum CourseApiType {
  Course_List = '/courses',
  GetTopCourses = '/courses/featured',
  LessonDetail = '/pages',
  Support = '/support/suggest',
  EcosystemProfile = '/eco-system-profiles'
}

class CourseApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取课程列表信息 */
  getCourseList(searchString?: string) {
    let url: string = CourseApiType.Course_List;
    if (searchString) url = `${url}?${searchString}`;
    return this.service.get<PageResult<ProjectCourseType>>(url);
  }

  getTopCourses<T>(params: { type: string }) {
    return this.service.get<T[]>(CourseApiType.GetTopCourses, {
      params
    });
  }

  /** 获取课程列表信息By search */
  getCourseListBySearch<T>(params: object) {
    return this.service.get<T>(`${CourseApiType.Course_List}`, {
      params
    });
  }

  /** 获取UGC课程列表信息By search */
  getUgcCourseListBySearch<T>(params: object) {
    return this.service.get<T>(`${CourseApiType.Course_List}/ugc`, {
      params
    });
  }

  /** 获取单个课程的详情信息 */
  getCourseDetail<T extends CourseDetailType | ElectiveCourseDetailType>(
    courseId: string,
    includeUnits = false,
    includePages = false
  ) {
    let includes = [];

    if (includeUnits) includes.push('units');
    if (includePages) includes.push('pages');

    return this.service.get<T>(`${CourseApiType.Course_List}/${courseId}`, {
      params: {
        include: includes.join(',')
      }
    });
  }

  /** 获取单个课程的详情信息 */
  async fetchCourseDetail<
    T extends CourseDetailType | ElectiveCourseDetailType
  >(courseId: string, includeUnits = false, includePages = false): Promise<T> {
    const cacheFn = cache(async () => {
      return this.getCourseDetail<T>(courseId, includeUnits, includePages);
    });

    return cacheFn();
  }

  /** 获取单个课程下的所有units */
  getCourseUnits(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units`;
    return this.service.get<CourseUnitType[]>(url);
  }

  /** 获取所有unit及其下面的pages，主要用来获取Teaser的课程数据 */
  getCourseUnitsAndPages(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units?include=pages`;
    return this.service.get<UnitPagesListType[]>(url);
  }

  /** 获取单个unit及其下面的pages */
  getCourseUnit(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}`;
    return this.service.get<CourseUnitStateType>(url);
  }

  /** 获取每个unit下的所有lesson */
  getCourseUnitLessons(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}?include=pages`;
    return this.service.get<
      CourseUnitStateType & { pages: CourseLessonStateType[] }
    >(url);
  }

  /** 获取单个lesson的内容 */
  getLessonContent<T extends CourseLessonType | ElectiveLessonType>(
    lessonId: string
  ) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}`;
    return this.service.get<T>(url);
  }
  /** 获取单个lesson的内容Mob */
  getLessonContentMob<T extends CourseLessonType | ElectiveLessonType>(
    lessonId: string
  ) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/v2`;
    return this.service.get<T>(url);
  }

  /** 获取单个lesson的内容 */
  getLearningLessonId(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/learning-page`;
    return this.service.get<{ pageId: string; pageName: string }>(url);
  }

  /** 开始一个lesson */
  startLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/start`;
    return this.service.get(url);
  }

  /** 完成一个lesson */
  completeLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/complete`;
    return this.service.get(url);
  }

  markQuestState(lessonId: string, isWin: boolean) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/quest`;
    return this.service.post(url, {
      data: { isWin }
    });
  }

  /** 完成单个quiz */
  completeQuiz(lessonId: string, quizIndex: number) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/quiz`;
    return this.service.post(url, {
      data: { index: quizIndex, isCompleted: true }
    });
  }

  /** 提交bug和建议 */
  commitSuggest(data: FormData) {
    return this.service.post(CourseApiType.Support, {
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /** 获取mini Elective profile */
  getElectiveProfile(electiveId: string) {
    const url = `${CourseApiType.EcosystemProfile}/${electiveId}`;
    return this.service.get<EcosystemProfileType>(url);
  }

  /** 获取mini Elective profile */
  getProfileElective(electiveId: string) {
    const url = `${CourseApiType.EcosystemProfile}/${electiveId}/electives`;
    return this.service.get<EcosystemElectiveType[]>(url);
  }

  getCoursesByCreator(courseId: string) {
    const url = `/${CourseApiType.Course_List}/${courseId}/creator-others`;
    return this.service.get<UGCCourseType[]>(url);
  }

  fetchCoursesByCreator(courseId: string) {
    const cacheFn = cache(async () => {
      return this.getCoursesByCreator(courseId);
    });

    return cacheFn();
  }
}

export default CourseApi;
