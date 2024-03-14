import type { NextPage } from 'next';
import { useParams } from 'next/navigation';

interface IProps {}

const UserPage: NextPage<IProps> = (props) => {
  const { userId } = useParams();

  return (
    <>
      <div className="flex h-full w-full flex-col ">{userId}</div>
    </>
  );
};

export default UserPage;
