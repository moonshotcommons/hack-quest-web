import WebService from '@/service/webService/webService';

export enum MissioncenterApiType {
  Test = '/v1/test'
}

class MissioncenterApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
}

export default MissioncenterApi;
