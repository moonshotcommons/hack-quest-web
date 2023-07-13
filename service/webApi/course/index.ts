import WebService from '@/service/webService/webService';
import {
  CourseDetailType,
  CourseLessonStateType,
  CourseLessonType,
  CourseResponse,
  CourseUnitStateType,
  CourseUnitType,
  UnitPagesListType
} from './type';
import { LessonContentType } from '@/constants/lesson';

export enum CourseApiType {
  Course_List = '/api/courses',
  LessonDetail = '/api/pages'
}

class CourseApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getCourseList() {
    return this.service.get<CourseResponse[]>(CourseApiType.Course_List);
  }

  getCourseDetail(courseId: string, isIncludeUnits: boolean = false) {
    return this.service.get<CourseDetailType>(
      `${CourseApiType.Course_List}/${courseId}${
        isIncludeUnits ? '?include=units' : ''
      }`
    );
  }

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
  getLessonContent(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}`;
    return this.service.get<any>(url);
  }

  /** 获取单个lesson的内容 */
  getLearningLessonId(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/learning-page`;
    return this.service.get<{ pageId: string }>(url);
  }

  /** 开始一个lesson */
  startLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/start`;
    return this.service.get(url);
  }

  completeLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/complete`;
    return this.service.get(url);
  }
}

export default CourseApi;
