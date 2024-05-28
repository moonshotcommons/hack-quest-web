import WebService from '@/service/webService/webService';
import { EcosystemDetailType, EcosystemTask, EcosystemType } from './type';

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

  getEcosystemsDetailById(id: string, token: string) {
    return this.service.get<EcosystemDetailType>(`${EcosystemApiType.ECOSYSTEMS}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getEcosystemTasks(id: string, params?: Record<string, string>) {
    return this.service.get<{ learn: EcosystemTask[]; build: EcosystemTask[]; community: EcosystemTask[] }>(
      `${EcosystemApiType.ECOSYSTEMS}/${id}/tasks`,
      {
        params
      }
    );
  }
}

export default EcosystemApi;
