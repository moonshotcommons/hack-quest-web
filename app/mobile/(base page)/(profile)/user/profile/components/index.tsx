'use client';
import Experience from './Experience';
import Hackathon from './Hackathon';
import GithubActivity from './GithubActivity';
import OnChainActivity from './OnChainActivity';
import PersonalEdit from './PersonalEdit';
import PersonalLinks from './PersonalLinks';
import webApi from '@/service';
import { UserProfileType } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import type { NextPage } from 'next';
import Certifications from './Certifications';
import { BurialPoint } from '@/helper/burialPoint';
import { useEffect, Suspense } from 'react';
import { ProfileContext } from '../constants/type';
import Loading from '@/components/Common/Loading';

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
            <Suspense fallback={<Loading loading></Loading>}>
              <PersonalLinks></PersonalLinks>
            </Suspense>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default UserProfilePage;
