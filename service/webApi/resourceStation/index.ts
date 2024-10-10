import WebService from '@/service/webService/webService';
import {
  ApplicationStatus,
  BlogDetailType,
  BlogSearchType,
  BlogType,
  CoustomKeywordType,
  EventsType,
  FaucetRecordType,
  FaucetType,
  HackathonDataType,
  HackathonJugingInfoType,
  HackathonManageApplicationType,
  HackathonMemberType,
  HackathonRegisterInfo,
  HackathonTeamDetail,
  HackathonType,
  HackathonDetailRewardType,
  HackathonVariousType,
  HackathonVoteJudgeType,
  HackathonVoteType,
  HackathonWinnerType,
  JoinedHackathonType,
  PagedType,
  ProjectDataType,
  ProjectRankType,
  ProjectSubmitBody,
  ProjectType,
  ProjectVotesType,
  SimpleHackathonInfo,
  SubmissionStatusType,
  PartnerShipType,
  UtmSourceType,
  GrowthDataType,
  DistributionDataType
} from './type';
import { isUuid } from '@/helper/utils';
import { ApplicationSectionType } from '@/components/HackathonCreation/type';
import { GrowthOptionValue } from '@/app/[lang]/(web)/(other)/hackathon-manage/constants/type';

export enum ResourceStationApiType {
  Hackathon = '/hackathons',
  Projects = '/projects',
  Blogs = '/blogs',
  Glossary = '/glossaries',
  Events = '/events',
  Teams = '/hackathons/teams',
  Faucets = '/faucets',
  PartnerShips = '/partner-ships'
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

  /** 获取已加入的 hackathon 列表  */
  getJoinedHackathons(params?: object) {
    return this.service.get<JoinedHackathonType>(`${ResourceStationApiType.Hackathon}/joined`, {
      params
    });
  }

  getHackathonVote(params?: object) {
    return this.service.get<HackathonVoteType[]>(`${ResourceStationApiType.Hackathon}/voting`, {
      params
    });
  }

  getVoteOtherHackathons(hackathonId: string) {
    return this.service.get<HackathonType[]>(`${ResourceStationApiType.Hackathon}/${hackathonId}/others`);
  }

  /** 获取hackathon详情数据 */
  getHackathonDetail(id: string) {
    return this.service.get<HackathonType>(`${ResourceStationApiType.Hackathon}/${id}`);
  }
  getHackathonDetailById(id: string, params?: object) {
    return this.service.get<HackathonType>(`${ResourceStationApiType.Hackathon}/${id}/detail`, {
      params
    });
  }

  getHackathonRewards(hackathonId: string) {
    return this.service.get<HackathonDetailRewardType[]>(`${ResourceStationApiType.Hackathon}/${hackathonId}/winners`);
  }

  /** 获取hackathon 可以投票的project */
  // getVoteProjectsByHackathonId(hackathonId: string, params: object) {
  //   return this.service.get<ProjectType[]>(`${ResourceStationApiType.Hackathon}/${hackathonId}/projects`, {
  //     params
  //   });
  // }

  fetchHackathonPrizeTracks() {
    return this.service.get<string[]>(`${ResourceStationApiType.Hackathon}/prize-tracks`);
  }

  hackathonVoteSubmit(hackathonId: string, data: object) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/${hackathonId}/vote`, {
      data
    });
  }

  /** 获取project列表 */
  getProjectsList(params: Record<string, string | number | boolean> | { page: number; limit: number } = {}) {
    return this.service.get<ProjectDataType>(ResourceStationApiType.Projects, {
      params
    });
  }

  getHackathonVoteProjects({ hackathonId, params }: { hackathonId: string; params: Record<string, any> }) {
    return this.service.get<HackathonVoteJudgeType>(
      `${ResourceStationApiType.Hackathon}/${hackathonId}/voting-projects`,
      {
        params
      }
    );
  }
  /** 获取project列表 */
  getProjectsRankInfo(id: string) {
    return this.service.get<ProjectRankType>(`${ResourceStationApiType.Projects}/${id}/rank`);
  }

  /** 获取project详情数据 */
  getProjectsDetail(id: string) {
    return this.service.get<ProjectType>(`${ResourceStationApiType.Projects}/${id}`);
  }

  /**  */
  getProjectTracksDict(params?: object) {
    return this.service.get<string[]>(`${ResourceStationApiType.Projects}/tracks-dir`, {
      params
    });
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
    return this.service.get<SimpleHackathonInfo>(`${ResourceStationApiType.Hackathon}/${hackathonId}/simple`);
  }

  /** 获取用户注册的hackathon信息 */
  getHackathonRegisterInfo(hackathonId: string) {
    return this.service.get<HackathonRegisterInfo>(`${ResourceStationApiType.Hackathon}/${hackathonId}/members/me`);
  }

  /** 更新注册信息 */
  updateHackathonRegisterInfo<T extends { info: object; status: ApplicationSectionType | 'Review' }>(
    hackathonId: string,
    data: T
  ) {
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
  registerHackathon(hackathonId: string, data: object = {}) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/${hackathonId}/members/register`, {
      data
    });
  }

  getHackathonPrizeTracks(hackathonId: string) {
    return this.service.get<string[]>(`${ResourceStationApiType.Hackathon}/${hackathonId}/prize-tracks`);
  }

  /** 提交project */
  submitProject(data: ProjectSubmitBody, projectId?: string) {
    if (projectId && isUuid(projectId)) return this.updateProject(projectId, data);
    return this.service.post<{ id: string }>(ResourceStationApiType.Projects, {
      data
    });
  }

  /** 更新project */
  updateProject(projectId: string, data: ProjectSubmitBody) {
    return this.service.patch<{ id: string }>(`${ResourceStationApiType.Projects}/${projectId}`, {
      data
    });
  }

  projectSubmit(projectId: string) {
    return this.service.post(`${ResourceStationApiType.Projects}/${projectId}/submit`);
  }

  getFaucets(params: object) {
    return this.service.get<{ total: number; data: FaucetType[] }>(`${ResourceStationApiType.Faucets}`, {
      params
    });
  }

  getFaucetDetailById(chainId: string) {
    return this.service.get<FaucetType>(`${ResourceStationApiType.Faucets}/${chainId}`);
  }

  getFaucetRecords(faucetId: string, params: object) {
    return this.service.get<{ total: number; data: FaucetRecordType[] }>(
      `${ResourceStationApiType.Faucets}/${faucetId}/record`,
      {
        params
      }
    );
  }

  faucetClaim(data: object) {
    return this.service.post(`${ResourceStationApiType.Faucets}/claim`, {
      data
    });
  }

  getHackathonsByCreator(token?: string) {
    return this.service.get<HackathonType[]>(`${ResourceStationApiType.Hackathon}/creator`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getHackathonMember(hackathonId: string) {
    return this.service.get<{ data: HackathonMemberType[] }>(
      `${ResourceStationApiType.Hackathon}/${hackathonId}/members`
    );
  }

  hackathonCustomizeDeleteById(hackathonId: string, customId: string) {
    return this.service.delete(`${ResourceStationApiType.Hackathon}/${hackathonId}/customize/${customId}`);
  }

  submitPublish(hackathonId: string) {
    return this.service.patch<void>(`${ResourceStationApiType.Hackathon}/${hackathonId}/submit`);
  }

  getHackathonVariousData(hackathonId: string) {
    return this.service.get<HackathonVariousType>(`${ResourceStationApiType.Hackathon}/${hackathonId}/stats`);
  }

  getHackathonApplications(hackathonId: string) {
    return this.service.get<HackathonManageApplicationType[]>(
      `${ResourceStationApiType.Hackathon}/admin/${hackathonId}/applications`
    );
  }

  changeHackathonApplicationStatus(
    hackathonId: string,
    data: {
      id: string;
      type: 'team' | 'member';
      joinState: ApplicationStatus;
    }[]
  ) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/review`, {
      data
    });
  }

  memberConfirmRegister(hackathonId: string) {
    return this.service.patch(`${ResourceStationApiType.Hackathon}/${hackathonId}/members/register-confirm`);
  }

  getProjectVoteById(projectId: string) {
    return this.service.get<ProjectVotesType>(`${ResourceStationApiType.Projects}/${projectId}/voting`);
  }

  getHackathonSubmissionStatus(hackahtonId: string) {
    return this.service.get<SubmissionStatusType[]>(
      `${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/judge-stats`
    );
  }

  getHackathonSubmissionProjects(hackahtonId: string, params: object) {
    return this.service.get<ProjectType[]>(`${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/projects`, {
      params
    });
  }

  getHackathonJudgingInfo(hackahtonId: string, params: object) {
    return this.service.get<HackathonJugingInfoType>(
      `${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/judging`,
      {
        params
      }
    );
  }

  getHackathonJudgingWinner(hackahtonId: string, params: object) {
    return this.service.get<HackathonWinnerType[]>(`${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/winner`, {
      params
    });
  }

  hackathonWinnerAdd(
    hackahtonId: string,
    data: { rewardId: string; place: number; name: string; projectId: string; type: 'base' | 'other' }
  ) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/winner`, {
      data
    });
  }

  hackathonWinnerEdit(hackahtonId: string, winnerId: string, data: { name: string; projectId: string }) {
    return this.service.patch(`${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/winner/${winnerId}`, {
      data
    });
  }

  hackathonWinnerDelete(hackahtonId: string, winnerId: string) {
    return this.service.delete(`${ResourceStationApiType.Hackathon}/admin/${hackahtonId}/winner/${winnerId}`);
  }

  hackathonJudgeAnnounce(hackathonId: string, judgeId: string) {
    return this.service.get(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/judge/${judgeId}/announce`);
  }

  getPartnerShips() {
    return this.service.get<PartnerShipType[]>(`${ResourceStationApiType.PartnerShips}`);
  }

  getUtmSource(hackathonId: string) {
    return this.service.get<UtmSourceType[]>(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/utm`);
  }

  addUtmSource(hackathonId: string, data: UtmSourceType) {
    return this.service.post(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/utm`, {
      data
    });
  }

  editUtmSource(hackathonId: string, utmId: string, data: object) {
    return this.service.patch(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/utm/${utmId}`, {
      data
    });
  }

  deleteUtmSource(hackathonId: string, utmId: string) {
    return this.service.delete(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/utm/${utmId}`);
  }

  getUtmGrowth(hackathonId: string, cycle: GrowthOptionValue) {
    return this.service.get<GrowthDataType>(`${ResourceStationApiType.Hackathon}/admin/${hackathonId}/growth`, {
      params: {
        cycle
      }
    });
  }

  getUtmDistribution(hackathonId: string) {
    return this.service.get<DistributionDataType>(
      `${ResourceStationApiType.Hackathon}/admin/${hackathonId}/distribution`
    );
  }

  projectMark(projectId: string, data: object) {
    return this.service.patch(`${ResourceStationApiType.Projects}/${projectId}/mark`, {
      data
    });
  }
}

export default ResourceStationApi;
