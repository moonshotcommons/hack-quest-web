import React, { useState } from 'react';
import { UserLevelType, BadgesType } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import { LoginResponse } from '@/service/webApi/user/type';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import IconTip from '@/public/images/mission-center/icon_tip.svg';

type UserInfoType = {
  userInfo: LoginResponse | null;
  useLevel: UserLevelType;
  badges: BadgesType[];
};
const UserInfo: React.FC<UserInfoType> = ({ userInfo, useLevel, badges }) => {
  const [showBadges, setShowBadges] = useState(false);
  const useLevelBadges =
    useLevel?.badges?.length > 3
      ? useLevel?.badges?.slice(0, 3)
      : useLevel?.badges;

  return (
    <div>11</div>
    // <div className="flex justify-center  w-[400px]">
    //   <div className="flex-col-center w-[320px] ">
    //     <div className="relative rounded-[50%] w-[102px] h-[102px] overflow-hidden">
    //       {userInfo?.avatar && (
    //         <Image
    //           src={userInfo?.avatar as string}
    //           alt="avatar"
    //           fill
    //           className="object-cover"
    //         ></Image>
    //       )}
    //     </div>

    //     <div className="flex-col-center pt-5 mb-[40px]">
    //       <p className="leading-[22.5px]">
    //         <span className="text-[18px] ">{userInfo?.name}</span>
    //         <span className="ml-[15px] font-[250]">
    //           Level {useLevel?.level ?? 0}
    //         </span>
    //       </p>
    //     </div>

    //     <div className="text-[#000] flex w-full items-center mb-5">
    //       <div className="h-full w-[49.5%] flex-col-center justify-between">
    //         <p>Total XP</p>
    //         <div className="text-[28px] pt-1  flex-row-center">
    //           <Image
    //             src={IconCoin}
    //             width={30}
    //             alt="avatar"
    //             className="object-cover"
    //           ></Image>
    //           <span className=" leading-[45px] ml-[10px]">
    //             {useLevel?.expTotal ?? 0}
    //           </span>
    //         </div>
    //       </div>

    //       <div className="h-[51px] w-[0.5px] bg-[#000]"></div>

    //       <div className="h-full  w-[49.5%] flex-col-center justify-between">
    //         <p>Total Hack Coins</p>
    //         <div className="text-[28px] pt-1  flex-row-center">
    //           <Image
    //             src={IconXp}
    //             width={30}
    //             alt="avatar"
    //             className="object-cover"
    //           ></Image>
    //           <span className=" leading-[45px] ml-[10px]">
    //             {useLevel?.expTotal ?? 0}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="w-full mb-[40px]">
    //       <div className="mb-[15px]">
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center gap-[5px]">
    //             <Image
    //               src={IconXp}
    //               width={22}
    //               alt="avatar"
    //               className="object-cover"
    //             ></Image>
    //             <span>Total XP</span>
    //           </div>
    //           <div className="text-[12px]">
    //             <span>{useLevel?.expTotal ?? 0}</span>/
    //             <span>{useLevel?.expTotal ?? 0}</span>
    //           </div>
    //         </div>
    //         <div className="h-[7px] mt-[3px] rounded-[3px] bg-[#DADADA]">
    //           <div
    //             className="h-full rounded-[3px] bg-[#FCC409]"
    //             style={{
    //               width: '10%'
    //             }}
    //           ></div>
    //         </div>
    //         <div className="flex justify-between items-center text-[12px] leading-[20px]">
    //           <span>Level {useLevel?.level ?? 0}</span>
    //           <span>Level {useLevel?.level ?? 0}</span>
    //         </div>
    //       </div>
    //       <div className="mb-[15px]">
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center gap-[5px]">
    //             <Image
    //               src={IconXp}
    //               width={22}
    //               alt="avatar"
    //               className="object-cover"
    //             ></Image>
    //             <span>Today’s XP</span>
    //           </div>
    //           <div className="text-[12px]">
    //             <span>{useLevel?.expTotal ?? 0}</span>/
    //             <span>{useLevel?.expTotal ?? 0}</span>
    //           </div>
    //         </div>
    //         <div className="h-[7px] mt-[3px] rounded-[3px] bg-[#DADADA]">
    //           <div
    //             className="h-full rounded-[3px] bg-[#FCC409]"
    //             style={{
    //               width: '10%'
    //             }}
    //           ></div>
    //         </div>
    //         <div className="flex justify-between items-center text-[12px] leading-[20px]">
    //           <span>Today</span>
    //           <div className="flex items-center gap-[5px]">
    //             <span>Max. Daily</span>
    //             <Image
    //               src={IconTip}
    //               width={10}
    //               alt="avatar"
    //               className="object-cover"
    //             ></Image>
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center gap-[5px]">
    //             <Image
    //               src={IconCoin}
    //               width={22}
    //               alt="avatar"
    //               className="object-cover"
    //             ></Image>
    //             <span>Today’s Hack Coins</span>
    //           </div>
    //           <div className="text-[12px]">
    //             <span>{useLevel?.expTotal ?? 0}</span>/
    //             <span>{useLevel?.expTotal ?? 0}</span>
    //           </div>
    //         </div>
    //         <div className="h-[7px] mt-[3px] rounded-[3px] bg-[#DADADA]">
    //           <div
    //             className="h-full rounded-[3px] bg-[#FCC409]"
    //             style={{
    //               width: '10%'
    //             }}
    //           ></div>
    //         </div>
    //         <div className="flex justify-between items-center text-[12px] leading-[20px]">
    //           <span>Today</span>
    //           <div className="flex items-center gap-[5px]">
    //             <span>Max. Daily</span>
    //             <Image
    //               src={IconTip}
    //               width={10}
    //               alt="avatar"
    //               className="object-cover"
    //             ></Image>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex flex-col items-start w-full">
    //       <div className="flex items-center gap-[5px] text-[#000]">
    //         <span>Your HackQuest rights</span>
    //         <Image
    //           src={IconTip}
    //           width={10}
    //           alt="avatar"
    //           className="object-cover"
    //         ></Image>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserInfo;
