import { FC } from 'react';
import UserProfile from './UserProfile';
import BackgroundImage from './BackgroundImage';

interface PersonalEditProps {
  edit: boolean;
}

const PersonalEdit: FC<PersonalEditProps> = (props) => {
  const { edit } = props;

  return (
    <div className="relative flex h-[554px] w-full flex-col justify-between rounded-[10px] bg-neutral-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
      <BackgroundImage edit={edit}></BackgroundImage>
      <></>
      <div className="w-full flex-1">
        <UserProfile edit={edit}></UserProfile>
      </div>
    </div>
  );
};

export default PersonalEdit;
