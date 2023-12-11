import Experience from '@/components/v2/User/Profile/Experience';
import Hackathon from '@/components/v2/User/Profile/Hackathon';
import GithubActivity from '@/components/v2/User/Profile/GithubActivity';
import OnChainActivity from '@/components/v2/User/Profile/OnChainActivity';
import PersonalEdit from '@/components/v2/User/Profile/PersonalEdit';
import PersonalLinks from '@/components/v2/User/Profile/PersonalLinks';
import { ProfileContext } from '@/components/v2/User/Profile/type';
import webApi from '@/service';
import { UserProfileType } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import type { NextPage } from 'next';
import Certifications from '@/components/v2/User/Profile/Certifications';
import { BurialPoint } from '@/helper/burialPoint';
import { useEffect } from 'react';

interface IProps {}

const UserProfilePage: NextPage<IProps> = (props) => {
  const {
    refresh,
    data: profile = {} as UserProfileType,
    loading
  } = useRequest(async () => {
    const res = await webApi.userApi.getUserProfile();
    return res;
  });

  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('user-profile-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, refresh, loading }}>
      <div className="container m-auto pb-[80px]">
        <div className="mt-[40px]">
          <PersonalEdit edit={true}></PersonalEdit>
        </div>
        <div className="flex justify-between gap-x-[40px] mt-[40px]">
          <div className="flex-1 flex flex-col gap-y-[40px] z-10">
            <GithubActivity edit={true}></GithubActivity>
            <Experience edit={true} />
            <Hackathon edit={true} />
            <Certifications></Certifications>
          </div>
          <div
            className="flex flex-col gap-y-[40px] z-0"
            style={{
              width: `${(420 / 1280) * 100}%`
            }}
          >
            <OnChainActivity></OnChainActivity>
            <PersonalLinks></PersonalLinks>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default UserProfilePage;
