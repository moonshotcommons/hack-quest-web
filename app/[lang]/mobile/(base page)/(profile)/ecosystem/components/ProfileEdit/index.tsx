import { FC } from 'react';
import UserProfile from './UserProfile';
import BackgroundImage from './BackgroundImage';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { EcosystemProfileType } from '@/service/webApi/elective/type';
import { useParams } from 'next/navigation';
import Loading from '@/components/Common/Loading';

interface ProfileEditProps {}

const ProfileEdit: FC<ProfileEditProps> = (props) => {
  const { profileId } = useParams();
  const { data: profile = {} as EcosystemProfileType, loading } = useRequest(async () => {
    const res = webApi.courseApi.getElectiveProfile(profileId as string);
    return res;
  });
  return (
    <div className="relative w-full rounded-[10px] bg-neutral-white  shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
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
