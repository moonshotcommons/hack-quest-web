import WebService from '@/service/webService/webService';
import { PageResult } from '../type';
import { FuelInfo, LaunchPoolProjectType, ParticipateInfo, StakeInfo } from './type';
import { cache } from 'react';

export enum LaunchPoolApiType {
  GetProjects = '/launch-projects'
}

class LaunchPoolApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /* 获取projects列表 */
  getProjects() {
    return this.service.get<PageResult<LaunchPoolProjectType>>(LaunchPoolApiType.GetProjects);
  }

  getProjectsFromCache() {
    const cacheFn = cache(async () => {
      return this.getProjects();
    });

    return cacheFn();
  }

  /* 根据获取project详情 */
  getProjectById(projectId: string) {
    const url = `${LaunchPoolApiType.GetProjects}/${projectId}`;
    return this.service.get<LaunchPoolProjectType>(url);
  }

  /* 获取用户参与信息 */
  getParticipateInfo(projectId: string) {
    const url = `${LaunchPoolApiType.GetProjects}/${projectId}/me`;
    return this.service.get<ParticipateInfo>(url);
  }

  /* 获取fuels信息 */
  getFuelsInfo(projectId: string) {
    const url = `${LaunchPoolApiType.GetProjects}/${projectId}/fuels`;
    return this.service.get<FuelInfo[]>(url);
  }

  /* 加入project */
  participateProject(projectId: string, inviteCode: string) {
    const url = `${LaunchPoolApiType.GetProjects}/${projectId}/join`;
    return this.service.get(url, {
      params: { code: inviteCode }
    });
  }

  /* 质押 */
  stake(projectId: string) {
    const url = `${LaunchPoolApiType.GetProjects}/${projectId}/stake`;
    return this.service.post<StakeInfo>(url);
  }

  joinWaitList(email: string) {}
}

export default LaunchPoolApi;
