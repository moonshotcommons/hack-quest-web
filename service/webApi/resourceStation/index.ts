import WebService from '@/service/webService/webService';
import {
  BlogDetailType,
  BlogSearchType,
  BlogType,
  CoustomKeywordType,
  EventsType,
  HackathonDataType,
  HackathonRegisterInfo,
  HackathonTeamDetail,
  HackathonType,
  PagedType,
  ProjectDataType,
  ProjectType,
  RegisterInfoBody
} from './type';
import { isUuid } from '@/helper/utils';

export enum ResourceStationApiType {
  Hackathon = '/hackathons',
  Projects = '/projects',
  Blogs = '/blogs',
  Glossary = '/glossaries',
  Events = '/events',
  Teams = '/hackathons/teams'
}

class ResourceStationApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取hackathon列表 */
  getHackathonList(params: object) {
    return this.service.get<HackathonDataType>(ResourceStationApiType.Hackathon, {
      params
    });
  }

  /** 获取hackathon详情数据 */
  getHackathonDetail(id: string) {
    return this.service.get<HackathonType>(`${ResourceStationApiType.Hackathon}/${id}`);
  }

  /** 获取project列表 */
  getProjectsList(params: Record<string, string | number | boolean> | { page: number; limit: number } = {}) {
    return this.service.get<ProjectDataType>(ResourceStationApiType.Projects, {
      params
    });
  }

  /** 获取project详情数据 */
  getProjectsDetail(id: string) {
    return this.service.get<ProjectType>(`${ResourceStationApiType.Projects}/${id}`);
  }

  /**  */
  getProjectTracksDict() {
    return this.service.get<string[]>(`${ResourceStationApiType.Projects}/tracks-dir`);
  }

  getBlog(params: BlogSearchType & PagedType) {
    return this.service.get<{ data: BlogType[]; total: number }>(`${ResourceStationApiType.Blogs}`, {
      params
    });
  }

  getFeaturedBlog(params = {}) {
    return this.service.get<BlogType[]>(`${ResourceStationApiType.Blogs}/featured`, {
      params
    });
  }

  getBlogDetail(id: string) {
    return this.service.get<BlogDetailType>(`${ResourceStationApiType.Blogs}/${id}`);
  }

  getGlossaryList(params: object) {
    return this.service.get<{ data: BlogType[]; total: number }>(`${ResourceStationApiType.Glossary}`, {
      params
    });
  }

  getFeaturedGlossary(params = {}) {
    return this.service.get<BlogType[]>(`${ResourceStationApiType.Glossary}/featured`, {
      params
    });
  }

  getGlossaryDetail(id: string) {
    return this.service.get<BlogDetailType>(`${ResourceStationApiType.Glossary}/${id}`);
  }

  getGlossaryTracks() {
    return this.service.get<string[]>(`${ResourceStationApiType.Glossary}/tracks`);
  }

  customKeyword(data: { type: CoustomKeywordType; keyword: string }) {
    return this.service.post(`custom-keywords`, {
      data
    });
  }

  getEvents(params?: object) {
    return this.service.get<{ data: EventsType[]; total: number }>(`${ResourceStationApiType.Events}`, {
      params
    });
  }

  getEventsDetailById(id: string) {
    return this.service.get<EventsType>(`${ResourceStationApiType.Events}/${id}`);
  }

  /** 获取hackathon的简单信息 */
  getSimpleHackathonInfo(hackathonId: string) {
    return this.service.get<{ id: string; name: string; alias: string }>(
      `${ResourceStationApiType.Hackathon}/${hackathonId}/simple`
    );
  }

  /** 获取用户注册的hackathon信息 */
  getHackathonRegisterInfo(hackathonId: string) {
    return this.service.get<HackathonRegisterInfo>(`${ResourceStationApiType.Hackathon}/${hackathonId}/members/me`);
  }

  /** 更新注册信息 */
  updateHackathonRegisterInfo(hackathonId: string, data: RegisterInfoBody) {
    return this.service.post<{}>(`${ResourceStationApiType.Hackathon}/${hackathonId}/members`, {
      data
    });
  }

  /** 创建和更新队伍 */
  addTeam(hackathonId: string, teamName: string) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/teams`, {
      data: {
        hackathonId,
        name: teamName
      }
    });
  }

  /** 获取team详情信息 */
  getHackathonTeamDetail(code: string) {
    return this.service.get<HackathonTeamDetail>(`${ResourceStationApiType.Teams}/${code}/detail`);
  }

  /** 删除team */
  deleteTeam(code: string) {
    return this.service.delete(`${ResourceStationApiType.Teams}/${code}`);
  }

  /** 删除成员 */
  deleteMember(code: string, userId: string) {
    return this.service.post(`${ResourceStationApiType.Teams}/${code}/remove-member`, {
      data: {
        userId
      }
    });
  }

  /** 加入team */
  joinTeam(code: string) {
    return this.service.post(`${ResourceStationApiType.Teams}/${code}/join`);
  }

  /** 离开team */
  leaveTeam(hackathonId: string) {
    return this.service.delete(`${ResourceStationApiType.Hackathon}/${hackathonId}/members`);
  }

  /** 注册hackathon */
  registerHackathon(hackathonId: string) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/${hackathonId}/members/register`);
  }

  getHackathonPrizeTracks(hackathonId: string) {
    return this.service.get<string[]>(`${ResourceStationApiType.Hackathon}/${hackathonId}/prize-tracks`);
  }

  /** 提交project */
  submitProject(data: FormData, projectId?: string) {
    if (projectId && isUuid(projectId)) return this.updateProject(projectId, data);
    return this.service.post<{ id: string }>(ResourceStationApiType.Projects, {
      data
    });
  }

  /** 更新project */
  updateProject(projectId: string, data: FormData) {
    return this.service.patch<{ id: string }>(`${ResourceStationApiType.Projects}/${projectId}`, {
      data
    });
  }

  projectSubmit(projectId: string) {
    return this.service.post(`${ResourceStationApiType.Projects}/${projectId}/submit`);
  }
}

export default ResourceStationApi;
