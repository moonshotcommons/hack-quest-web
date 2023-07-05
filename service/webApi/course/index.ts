import WebService from '@/service/webService/webService';
import { CourseResponse } from './type';

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

  getCourseDetail(courseId: string) {
    return this.service.get<CourseResponse[]>(
      `${CourseApiType.Course_List}/${courseId}/units`
    );
  }
}

export default CourseApi;
