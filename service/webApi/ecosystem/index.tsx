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

  getEcosystems(params: object) {
    return this.service.get<EcosystemType[]>(EcosystemApiType.ECOSYSTEMS, { params });
  }

  getActiveEcosystem() {
    return this.service.get<EcosystemDetailType>(`${EcosystemApiType.ECOSYSTEMS}/active`);
  }

  getMyEcosystems() {
    return this.service.get<EcosystemType[]>(`${EcosystemApiType.ECOSYSTEMS}/me`);
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

  switchEcosystem(ecosystemId: string) {
    return this.service.post<void>(`${EcosystemApiType.ECOSYSTEMS}/switch`, {
      data: {
        ecosystemId
      }
    });
  }

  claimTaskRewards(taskId: string) {
    return this.service.get<void>(`${EcosystemApiType.ECOSYSTEMS}/tasks/${taskId}/claim`);
  }
}

export default EcosystemApi;
