import Image from 'next/image';
import { FC } from 'react';

interface PeopleJoinedProps {
  avatars?: { id: string; url: string }[];
  itemSize?: number;
}

const PeopleJoined: FC<PeopleJoinedProps> = (props) => {
  const { avatars = [], itemSize = 40 } = props;
  return (
    <div className="flex">
      {avatars.map((avatar) => {
        return (
          <div key={avatar.id} className="-ml-2">
            <Image src={avatar.url} alt="avatar" width={itemSize} height={itemSize}></Image>
          </div>
        );
      })}
    </div>
  );
};

export default PeopleJoined;
