import type { NextPage } from 'next';

interface IProps {
  userId: string;
}

const UserPage: NextPage<IProps> = (props) => {
  return (
    <>
      <div className="flex h-full w-full flex-col "></div>
    </>
  );
};

export default UserPage;
