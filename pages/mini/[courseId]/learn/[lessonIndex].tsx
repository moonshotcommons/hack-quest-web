import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import MiniCoursePage from '@/components/v2/MiniCoursePage';
import useGetDevice from '@/hooks/useGetDevice';

interface IProps {}

const MiniUnit: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { courseId } = router.query;
  const isMobile = useGetDevice();
  if (!courseId) {
    return null;
  }

  return (
    <>
      {isMobile ? null : (
        <div className="w-full h-full flex flex-col font-next-book px-[40px] bg-[#f4f4f4]">
          {courseId && (
            <MiniCoursePage courseId={courseId as string}></MiniCoursePage>
          )}
        </div>
      )}
    </>
  );
};

export default MiniUnit;
