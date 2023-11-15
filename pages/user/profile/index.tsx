import ExperienceHackathon from '@/components/v2/User/Profile/ExperienceHackathon';
import { PageType } from '@/components/v2/User/Profile/ExperienceHackathon/type';
import GithubActivity from '@/components/v2/User/Profile/GithubActivity';
import OnChainActivity from '@/components/v2/User/Profile/OnChainActivity';
import PersonalEdit from '@/components/v2/User/Profile/PersonalEdit';
import PersonalLinks from '@/components/v2/User/Profile/PersonalLinks';
import { ProfileContext } from '@/components/v2/User/Profile/type';
import webApi from '@/service';
import { UserProfileType } from '@/service/webApi/user/type';
import { useRequest } from 'ahooks';
import type { NextPage } from 'next';

interface IProps {}

const UserProfilePage: NextPage<IProps> = (props) => {
  const { refresh, data: profile = {} as UserProfileType } = useRequest(
    async () => {
      const res = await webApi.userApi.getUserProfile();
      return res;
    }
  );
  return (
    <ProfileContext.Provider value={{ profile, refresh }}>
      <div className="container m-auto pb-[80px]">
        <div className="mt-[40px]">
          <PersonalEdit edit={true}></PersonalEdit>
        </div>
        <div className="flex gap-[40px] mt-[40px] w-full">
          <div className="flex-1">
            <GithubActivity></GithubActivity>
          </div>
          <OnChainActivity></OnChainActivity>
        </div>
        <div className="flex gap-[40px] mt-[40px] w-full">
          <div className="flex-1 flex flex-col gap-[40px]">
            <ExperienceHackathon pageType={PageType.EXPERIENCE} />
            {/* <ExperienceHackathon pageType={PageType.HACKATHON} /> */}
          </div>
          <PersonalLinks></PersonalLinks>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default UserProfilePage;
