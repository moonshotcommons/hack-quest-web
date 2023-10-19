import WebService from '@/service/webService/webService';
import {
  UserLevelType,
  UserCoinType,
  UserTreasuresType,
  BadgesType,
  MissionDataType,
  DigTreasuresResponse,
  OpenTreasuresResponse
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
  /** 获取所有missionDiscord */
  getMissionDiscord() {
    return this.service.get<{ url: string }>(
      `${MissionCenterApiType.Missions}/discord`
    );
  }

  /** 挖宝箱 */
  digTreasures(lessonId: string) {
    const url = `${MissionCenterApiType.Treasures}/dig?lessonId=${lessonId}`;
    return this.service.get<DigTreasuresResponse>(url);
  }

  /** 开宝箱 */
  openTreasures(treasuresId: string) {
    const url = `${MissionCenterApiType.Treasures}/open`;
    return this.service.post<OpenTreasuresResponse>(url, {
      data: {
        id: treasuresId
      }
    });
  }
}

export default MissionCenterApi;
