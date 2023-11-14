import type { NextPage } from 'next';
import { useRouter } from 'next/router';

interface IProps {}

const UserPage: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <div className="w-full h-full flex flex-col font-next-book-Thin">
        {userId}
      </div>
    </>
  );
};

export default UserPage;
