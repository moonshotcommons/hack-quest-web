import WebService from '@/service/webService/webService';
import { EcosystemType } from './type';

export enum EcosystemApiType {
  ECOSYSTEMS = 'ecosystems'
}

class EcosystemApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getEcosystems() {
    return this.service.get<EcosystemType[]>(EcosystemApiType.ECOSYSTEMS);
  }

  getEcosystemsDetailById(id: string) {
    return this.service.get(`${EcosystemApiType.ECOSYSTEMS}/id`);
  }
}

export default EcosystemApi;
