import WebService from '@/service/webService/webService';
import { ProjectType, ProjectDataType } from './type';

export enum ProjectApiType {
  Projects = '/projects'
}

class ProjectApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  getProjectsList(
    params:
      | Record<string, string | number | boolean>
      | { page: number; limit: number } = {}
  ) {
    return this.service.get<ProjectDataType>(ProjectApiType.Projects, {
      params
    });
  }
  getProjectsDetail(id: string) {
    return this.service.get<ProjectDataType>(
      `${ProjectApiType.Projects}/${id}`
    );
  }
}

export default ProjectApi;
