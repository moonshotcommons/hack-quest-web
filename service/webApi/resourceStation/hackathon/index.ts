import WebService from '@/service/webService/webService';
import {} from './type';

export enum HackathonApiType {
  HACKATHON = '/hackathons'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  getUserLevel() {
    return this.service.get(HackathonApiType.HACKATHON);
  }
}

export default HackathonApi;
