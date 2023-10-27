import WebService from '@/service/webService/webService';
import { HackathonDataType, HackathonType } from './type';

export enum HackathonApiType {
  Hackathon = '/hackathons'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  getHackathonList(params: object) {
    return this.service.get<HackathonDataType>(HackathonApiType.Hackathon, {
      params
    });
  }
  getHackathonDetail(id: string) {
    return this.service.get<HackathonType>(
      `${HackathonApiType.Hackathon}/${id}`
    );
  }
}

export default HackathonApi;
