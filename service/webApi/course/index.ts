import WebService from '@/service/webService/webService';
import { CourseDetailType, CourseResponse } from './type';

export enum CourseApiType {
  Course_List = '/api/courses'
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
        isIncludeUnits ? '?include=unit' : ''
      }`
    );
  }

  getCourseUnitPages(
    courseId: string,
    unitId: string,
    isIncludePages: boolean = false
  ) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}${
      isIncludePages ? '?include=pages' : ''
    }`;

    return this.service.get<CourseResponse[]>(url);
  }
}

export default CourseApi;
