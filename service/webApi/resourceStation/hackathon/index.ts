import WebService from '@/service/webService/webService';
import {} from './type';

export enum HackathonApiType {
  Hackathon = '/hackathons'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  // getUserLevel() {
  //   return this.service.get(HackathonApiType.GetUserLevel);
  // }

  getPastHackathon(
    query:
      | Record<string, string | number>
      | { page: number; limit: number } = {}
  ) {
    return this.service.get(HackathonApiType.Hackathon, {
      params: {
        status: 'past',
        ...query
      }
    });
  }
}

export default HackathonApi;
