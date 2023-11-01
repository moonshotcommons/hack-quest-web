import WebService from '@/service/webService/webService';

export enum ProjectApiType {
  GetProjects = '/projects'
}

class ProjectApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getFeaturedProjects() {
    return this.service.get(ProjectApiType.GetProjects, {
      params: {
        featured: true
      }
    });
  }
}

export default ProjectApi;
