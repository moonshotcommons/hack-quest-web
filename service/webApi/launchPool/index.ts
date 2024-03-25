import WebService from '@/service/webService/webService';
import { PageResult } from '../type';
import { LaunchPoolProjectType, StakeInfo } from './type';
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
    return this.service.get<PageResult<LaunchPoolProjectType>>(
      LaunchPoolApiType.GetProjects
    );
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
    return this.service.get<LaunchPoolProjectType>(url);
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
}

export default LaunchPoolApi;
