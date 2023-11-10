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
      <div className="container h-[500px] m-auto">
        <PersonalEdit></PersonalEdit>
        <GithubActivity></GithubActivity>
        <OnChainActivity></OnChainActivity>
        <Experience></Experience>
        <PersonalLinks></PersonalLinks>
      </div>
    </>
  );
};

export default UserProfilePage;
