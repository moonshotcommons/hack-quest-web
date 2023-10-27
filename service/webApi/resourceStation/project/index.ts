import WebService from '@/service/webService/webService';

export enum ProjectApiType {
  GetUserLevel = '/users/level'
}

class ProjectApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  getUserLevel() {
    return this.service.get(ProjectApiType.GetUserLevel);
  }
}

export default ProjectApi;
