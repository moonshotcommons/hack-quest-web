import Experience from '@/components/v2/User/Profile/Experience';
import GithubActivity from '@/components/v2/User/Profile/GithubActivity';
import OnChainActivity from '@/components/v2/User/Profile/OnChainActivity';
import PersonalEdit from '@/components/v2/User/Profile/PersonalEdit';
import PersonalLinks from '@/components/v2/User/Profile/PersonalLinks';
import type { NextPage } from 'next';

interface IProps {}

const UserProfilePage: NextPage<IProps> = (props) => {
  return (
    <>
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
          <div className="flex-1">
            <Experience></Experience>
          </div>
          <PersonalLinks></PersonalLinks>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
