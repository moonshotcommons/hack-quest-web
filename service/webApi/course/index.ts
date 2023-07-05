import WebService from '@/service/webService/webService';
import {
  CourseDetailType,
  CourseLessonStateType,
  CourseLessonType,
  CourseResponse,
  CourseUnitStateType,
  CourseUnitType
} from './type';

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

  getCourseUnitsPages(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units?include=pages`;
    return this.service.get<(CourseUnitType & { pages: CourseLessonType[] })[]>(
      url
    );
  }

  getCourseUnit(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}`;
    return this.service.get<CourseUnitStateType>(url);
  }

  getCourseUnitLessons(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}?include=pages`;
    return this.service.get<
      CourseUnitStateType & { pages: CourseLessonStateType[] }[]
    >(url);
  }

  getLessonContent(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/`;
    return this.service.get<CourseResponse[]>(url);
  }
}

export default CourseApi;
