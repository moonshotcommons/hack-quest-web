import WebService from '@/service/webService/webService';
import { ProjectDetail } from './type';

export enum ProjectApiType {
  GetProjects = '/projects'
}

class ProjectApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getFeaturedProjects() {
    return this.service.get<{ data: ProjectDetail[]; total: number }>(
      ProjectApiType.GetProjects,
      {
        params: {
          featured: true
        }
      }
    );
  }
}

export default ProjectApi;
