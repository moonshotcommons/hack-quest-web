import React, { useState } from 'react';
import UserInfo from '@/components/v2/MissionCenter/UserInfo';
import ClaimContent from '@/components/v2/MissionCenter/ClaimContent';
import webApi from '@/service';
import {
  UserLevelType,
  UserCoinType,
  UserTreasuresType
} from '@/service/webApi/missionCenter/type';
import { useRequest } from 'ahooks';
import { AppRootState } from '@/store/redux';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { setMissionData } from '@/store/redux/modules/missionCenter';

function MissionCenter() {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  const [claimLoading, setClaimLoading] = useState(false);
  const dispatch = useDispatch();
  const { missionData } = useSelector((state: AppRootState) => {
    return {
      missionData: state.missionCenter?.missionData
    };
  });
  /** 获取用户等级 */
  const { data: userLevel = {} as UserLevelType, run: updateUserLevel } =
    useRequest(
      async () => {
        let res = await webApi.missionCenterApi.getUserLevel();
        return res;
      },
      {
        onError(error: any) {
          // message.error(`get user level ${error.msg}!`);
        }
      }
    );
  /** 获取用户金币 */
  const { data: userCoin = {} as UserCoinType, run: updateUserCoin } =
    useRequest(
      async () => {
        let res = await webApi.missionCenterApi.getUserCoins();
        return res;
      },
      {
        onError(error: any) {
          // message.error(`get user level ${error.msg}!`);
        }
      }
    );
  /** 获取用户金币 */
  const {
    data: userTreasure = [] as UserTreasuresType[],
    run: updateUserTreasure
  } = useRequest(
    async () => {
      let res = await webApi.missionCenterApi.getTreasuresCoins();
      return res;
    },
    {
      onError(error: any) {
        // message.error(`get user level ${error.msg}!`);
      }
    }
  );
  /** 更新mission */
  const updateMission = async () => {
    let res = await webApi.missionCenterApi.getAllMission();
    dispatch(setMissionData(res || []));
  };
  const updateUserData = () => {
    updateUserLevel();
    updateUserCoin();
    updateUserTreasure();
    updateMission();
  };

  const missionClaim = (missionIds: string[]) => {
    if (claimLoading) return;
    setClaimLoading(true);
    if (missionIds.length > 1) {
      Promise.all(missionIds.map((v: string) => handleClaim(v)))
        .then(() => {
          updateUserData();
          message.success('成功');
        })
        .finally(() => {
          setClaimLoading(false);
        });
    } else {
      handleClaim(missionIds[0])
        .then(() => {
          updateUserData();
          message.success('成功');
        })
        .finally(() => {
          setClaimLoading(false);
        });
    }
  };
  const handleClaim = (missionId: string) => {
    return new Promise((resolve) => {
      webApi.missionCenterApi
        .missionClaim(missionId)
        .then(() => {
          resolve('success');
        })
        .catch((error) => {
          message.error(`mission claim ${error.msg}!`);
        });
    });
  };

  return (
    <div className="flex justify-between w-full h-[calc(100vh-64px)]  text-[#0b0b0b] tracking-[0.3px] bg-[#f4f4f4]  text-[14px] font-next-book">
      <UserInfo
        userInfo={userInfo}
        userLevel={userLevel}
        userCoin={userCoin}
        userTreasure={userTreasure}
      />
      <ClaimContent missions={missionData} missionClaim={missionClaim} />
    </div>
  );
}

export default MissionCenter;
