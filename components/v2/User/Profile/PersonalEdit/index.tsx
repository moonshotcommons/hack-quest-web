import { FC, ReactNode } from 'react';
import UserProfile from './UserProfile';
import BackgroundImage from './BackgroundImage';

interface PersonalEditProps {
  edit: boolean;
}

const PersonalEdit: FC<PersonalEditProps> = (props) => {
  const { edit } = props;
  return (
    <div className="w-full h-[554px] rounded-[10px] bg-white overflow-hidden relative flex justify-between flex-col shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
      <BackgroundImage edit={edit}></BackgroundImage>
      <></>
      <div className="w-full flex-1">
        <UserProfile edit={edit}></UserProfile>
      </div>
    </div>
  );
};

export default PersonalEdit;
