import WebService from '@/service/webService/webService';
import {} from './type';

export enum HackathonApiType {
  GetUserLevel = '/users/level'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  getUserLevel() {
    return this.service.get(HackathonApiType.GetUserLevel);
  }
}

export default HackathonApi;
