import WebService from '@/service/webService/webService';
import {
  BlogDetailType,
  BlogSearchType,
  BlogType,
  HackathonDataType,
  HackathonType,
  PagedType,
  ProjectDataType,
  ProjectType
} from './type';

export enum ResourceStationApiType {
  Hackathon = '/hackathons',
  Projects = '/projects',
  Blogs = '/blogs'
}

class ResourceStationApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取hackathon列表 */
  getHackathonList(
    params:
      | Record<string, string | number>
      | { page: number; limit: number } = {}
  ) {
    return this.service.get<HackathonDataType>(
      ResourceStationApiType.Hackathon,
      {
        params
      }
    );
  }

  /** 获取hackathon详情数据 */
  getHackathonDetail(id: string) {
    return this.service.get<HackathonType>(
      `${ResourceStationApiType.Hackathon}/${id}`
    );
  }

  /** 获取project列表 */
  getProjectsList(
    params:
      | Record<string, string | number | boolean>
      | { page: number; limit: number } = {}
  ) {
    return this.service.get<ProjectDataType>(ResourceStationApiType.Projects, {
      params
    });
  }

  /** 获取project详情数据 */
  getProjectsDetail(id: string) {
    return this.service.get<ProjectType>(
      `${ResourceStationApiType.Projects}/${id}`
    );
  }

  /**  */
  getProjectTracksDict() {
    return this.service.get<string[]>(
      `${ResourceStationApiType.Projects}/tracks-dir`
    );
  }

  getBlog(params: BlogSearchType & PagedType) {
    return this.service.get<{ data: BlogType[]; total: number }>(
      `${ResourceStationApiType.Blogs}`,
      {
        params
      }
    );
  }

  getFeaturedBlog() {
    return this.service.get<BlogType[]>(
      `${ResourceStationApiType.Blogs}/featured`
    );
  }

  getBlogDetail(id: string) {
    return this.service.get<BlogDetailType>(
      `${ResourceStationApiType.Blogs}/${id}`
    );
  }
}

export default ResourceStationApi;
