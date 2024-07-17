import WebService from '@/service/webService/webService';
import { EcosystemDetailType, EcosystemTask, EcosystemType, LevelType } from './type';
import { CertificationType, UserCertificateInfo } from '../campaigns/type';

export enum EcosystemApiType {
  ECOSYSTEMS = 'ecosystems'
}

class EcosystemApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getEcosystems(params?: object) {
    return this.service.get<EcosystemType[]>(EcosystemApiType.ECOSYSTEMS, { params });
  }

  getAllEcosystems(params?: object, token?: string) {
    return this.service.get<EcosystemType[]>(EcosystemApiType.ECOSYSTEMS, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getActiveEcosystem(token?: string) {
    return this.service.get<EcosystemDetailType>(`${EcosystemApiType.ECOSYSTEMS}/active`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getMyEcosystems(params?: object) {
    return this.service.get<EcosystemType[]>(`${EcosystemApiType.ECOSYSTEMS}/me`, { params });
  }

  getEcosystemsDetailById(id: string, params: object, token: string) {
    return this.service.get<EcosystemDetailType>(`${EcosystemApiType.ECOSYSTEMS}/${id}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getEcosystemTasks(id: string, params: Record<string, any>, token?: string) {
    let param: any = { params };
    if (token) {
      param.headers = {
        Authorization: `Bearer ${token}`
      };
    }
    return this.service.get<{ learn: EcosystemTask[]; build: EcosystemTask[]; community: EcosystemTask[] }>(
      `${EcosystemApiType.ECOSYSTEMS}/${id}/tasks`,
      {
        ...param
      }
    );
  }

  claimTaskRewards(taskId: string) {
    return this.service.get<void>(`${EcosystemApiType.ECOSYSTEMS}/tasks/${taskId}/claim`);
  }
  switchEcosystem(data: object) {
    return this.service.post(`${EcosystemApiType.ECOSYSTEMS}/switch`, {
      data
    });
  }

  completeTask(taskId: string) {
    return this.service.get<void>(`${EcosystemApiType.ECOSYSTEMS}/tasks/${taskId}/complete`);
  }

  getEcosystemCertifications(ecosystemId: string, token: string) {
    return this.service.get<CertificationType[]>(`${EcosystemApiType.ECOSYSTEMS}/${ecosystemId}/certifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getLevels(ecosystemId: string, token: string) {
    return this.service.get<LevelType[]>(`${EcosystemApiType.ECOSYSTEMS}/${ecosystemId}/levels`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getEcosystemLevels(ecosystemId: string, params: object, token: string) {
    return this.service.get<LevelType[]>(`${EcosystemApiType.ECOSYSTEMS}/${ecosystemId}/levels`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  claimCertificateOverride(ecosystemId: string) {
    return this.service.post<UserCertificateInfo>(`${EcosystemApiType.ECOSYSTEMS}/${ecosystemId}/levels/claim`);
  }
}

export default EcosystemApi;
