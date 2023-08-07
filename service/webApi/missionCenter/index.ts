import WebService from '@/service/webService/webService';
import { UserLevelType, BadgesType, MissionDataType } from './type';

export enum MissionCenterApiType {
  GetUserLevel = '/api/user/level',
  GetAllBadges = '/api/badges',
  GetAllMission = '/api/missions'
}

class MissionCenterApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /** 获取用户等级 */
  getUserLevel() {
    return this.service.get<UserLevelType>(MissionCenterApiType.GetUserLevel);
  }
  /** 获取所有badge */
  getAllBadges() {
    return this.service.get<BadgesType[]>(MissionCenterApiType.GetAllBadges);
  }
  /** 获取所有mission */
  getAllMission() {
    return this.service.get<MissionDataType[]>(
      MissionCenterApiType.GetAllMission
    );
  }
}

export default MissionCenterApi;
