import { FC } from 'react';
import UserProfile from './UserProfile';
import BackgroundImage from './BackgroundImage';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import Loading from '../../Common/Loading';
import { EcosystemProfileType } from '@/service/webApi/elective/type';

interface ProfileEditProps {}

const ProfileEdit: FC<ProfileEditProps> = (props) => {
  const id = 'caddaf21-cf2c-45dd-9476-f4de119dd1c0';
  const { data: profile = {} as EcosystemProfileType, loading } = useRequest(
    async () => {
      const res = webApi.electiveApi.getElectiveProfile(id);
      return res;
    }
  );
  return (
    <div className="w-full rounded-[10px] bg-white relative  shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
      <Loading loading={loading}>
        {profile.id ? (
          <>
            <BackgroundImage url={profile.background}></BackgroundImage>
            <div className="w-full">
              <UserProfile profile={profile}></UserProfile>
            </div>
          </>
        ) : (
          <div className="h-[600px]"></div>
        )}
      </Loading>
    </div>
  );
};

export default ProfileEdit;
