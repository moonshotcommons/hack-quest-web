import React from 'react';
import UserInfo from './userInfo';
import Quests from './quests';
import Milestones from './milestones';
import SignUpStreak from './signup-streak';
import BeginnerRewards from './beginner-rewards';

function MissionCenter() {
  return (
    <div className="flex justify-between w-full  text-mission-center-basics  text-[14px] font-next-book">
      <UserInfo />
      <div className="w-[calc(76%-10px)] [&>div]:mb-3">
        <Quests />
        <Milestones />
        <SignUpStreak />
        <BeginnerRewards />
      </div>
    </div>
  );
}

export default MissionCenter;
