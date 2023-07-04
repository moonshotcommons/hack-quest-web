import WebService from '@/service/webService/webService';

export enum CourseApiType {
  Test = '/v1/test'
}

class CourseApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
}

export default CourseApi;
