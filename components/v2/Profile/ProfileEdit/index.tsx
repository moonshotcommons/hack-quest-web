import { FC, ReactNode, useContext } from 'react';
import UserProfile from './UserProfile';
import BackgroundImage from './BackgroundImage';

interface ProfileEditProps {}

const ProfileEdit: FC<ProfileEditProps> = (props) => {
  return (
    <div className="w-full rounded-[10px] bg-white relative flex justify-between flex-col shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
      <BackgroundImage></BackgroundImage>
      <div className="w-full flex-1">
        <UserProfile></UserProfile>
      </div>
    </div>
  );
};

export default ProfileEdit;
