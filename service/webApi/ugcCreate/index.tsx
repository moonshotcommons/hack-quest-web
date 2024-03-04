import WebService from '@/service/webService/webService';
export enum UgcCreateApiType {
  COURSE_CREATE = '/courses'
}

class UgcCreateApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 创建introduction */
  introductionAdd(data: object) {
    return this.service.post(UgcCreateApiType.COURSE_CREATE, {
      data
    });
  }
}

export default UgcCreateApi;
