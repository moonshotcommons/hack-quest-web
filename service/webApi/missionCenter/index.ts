import WebService from '@/service/webService/webService';
import {
  UserLevelType,
  UserCoinType,
  UserTreasuresType,
  BadgesType,
  MissionDataType
} from './type';

export enum MissionCenterApiType {
  GetUserLevel = '/users/level',
  GetUserCoin = '/users/coins',
  Treasures = '/treasures',
  GetAllBadges = '/badges',
  Missions = '/missions'
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
  /** 获取用户金币 */
  getUserCoins() {
    return this.service.get<UserCoinType>(MissionCenterApiType.GetUserCoin);
  }
  /** 获取用户宝箱 */
  getTreasuresCoins() {
    return this.service.get<UserTreasuresType[]>(
      MissionCenterApiType.Treasures
    );
  }
  /** 获取所有badge */
  getAllBadges() {
    return this.service.get<BadgesType[]>(MissionCenterApiType.GetAllBadges);
  }
  /** 获取所有mission */
  getAllMission() {
    return this.service.get<MissionDataType[]>(MissionCenterApiType.Missions);
  }
  /** mission claim */
  missionClaim(missionIds: string[]) {
    const url = `${MissionCenterApiType.Missions}/claim`;
    return this.service.post(url, {
      data: {
        missionIds
      }
    });
  }
}

export default MissionCenterApi;
